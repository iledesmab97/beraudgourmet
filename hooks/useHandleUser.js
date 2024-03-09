import { useState, useEffect, useMemo, useRef } from "react"
import useGetUser from '@/hooks/useGetUser'
import useDebounce from "./useDebounce"
import { isPossiblePhoneNumber } from 'libphonenumber-js'
import { userDataFromBackToFront, userDataFromFrontToBack, oneUserDataFromFrontToBack } from '@/utils/preparingData'
import { newAccount, updateMyAccount, verifyProperty } from '@/services/userApi'
import { useRouter } from 'next/navigation'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const validNombre=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/

const initialInputs = {
    email: '',
    name: '',
    password: '',
    numberPhone: '+52',
}

const initialInputsEdit = {
    email: '',
    password: '',
    passwordConfirmation: ''
}

function validation(inputs) {
    const errors = {}
    if ( !inputs.email ) errors.email = false
    if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese un correo válido'
    if ( inputs.name && !validNombre.test(inputs.name) ) errors.name = 'No colocar números ni caracteres especiales'
    if ( !(inputs.numberPhone === undefined || inputs.numberPhone === null) ) {
        const [code, place, number] = inputs.numberPhone.split(" ")
        if (!code) errors.numberPhone = 'Coloca el código del país'
        if ( place && !isPossiblePhoneNumber(inputs.numberPhone)) errors.numberPhone = 'Número de teléfono inválido'
    }
    return errors
}

function lastValidation(inputs) {
    const errors = {}
    if ( !inputs.email ) errors.email = 'Este campo no puede estar vacio'
    if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese un correo válido'
    if ( !inputs.name ) errors.name = 'Este campo no puede estar vacio'
    if ( inputs.name && !validNombre.test(inputs.name) ) errors.name = 'No colocar números ni caracteres especiales'
    if ( !inputs.password ) errors.password = 'Este campo no puede estar vacio'
    // if ( inputs.passwordConfirmation === "" ) errors.passwordConfirmation = 'Este campo no puede estar vacio'
    if ( !inputs.numberPhone ) errors.numberPhone = 'Este campo no puede estar vacio'
    if ( !(inputs.numberPhone === undefined || inputs.numberPhone === null) ) {
        const [code, place, number] = inputs.numberPhone.split(" ")
        if (!code) errors.numberPhone = 'Coloca el código del país'
        if ( place && !isPossiblePhoneNumber(inputs.numberPhone)) errors.numberPhone = 'Número de teléfono inválido'
    }
    return errors
}

function searchUser(email) {
    if (!email) return null
    return fetch(`${PATH_BACK}/users/registered?email=${email}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
}

function requestLogout() {
    return fetch(`${PATH_BACK}/users/logout`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => data)
}

function useHandleUser() {

    const { user, handleAddUser, handleUpdateUser, handleRemoveUser } = useGetUser()
    const userLoged = user.name ? true : false
    const [inputs, setInputs] = useState(() => userLoged ? {
        email: user.email,
        name: user.name,
        password: user.password,
        numberPhone: user.numberPhone
    } : initialInputs)
    const [inputsEdit, setInputsEdit] = useState({
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState(validation(inputs))
    const [errorsEdit, setErrorsEdit] = useState(validation(inputs))
    const [editing, setEditing] = useState({
        name: false,
        numberPhone: false
    })
    const { debounceSetValue } = useDebounce()
    const lastDataSet = useRef('')

    const [currentUser, setCurrentUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputs))
            if (!userLoged && (lastDataSet.current === 'email') && inputs.email) {
                searchUser(inputs.email)
                    .then(data => {
                        if (data === true || data === false) setCurrentUser(data)
                })
            }
            if (!inputs.email) setCurrentUser(false)
        }, 500)
    }, [inputs])

    useEffect(() => {
        debounceSetValue(() => {
            const newError = validation(inputsEdit)
            if ( !newError.email && inputsEdit.email === user.email ) {
                newError.email = 'Debe ingresar otro correo electrónico'
            }
            // setErrors(newError)
            setErrorsEdit(newError)
        }, 500)
    }, [inputsEdit])

    useEffect(() => {
        if (userLoged) {
            setInputs({
                email: user.email,
                name: user.name,
                password: user.password,
                numberPhone: user.numberPhone
            })
        } else {
            setInputs(initialInputs)
        }
    }, [user])

    useEffect(() => {
        if (user.role === 'client' || !user.role) return
        router.push('/admin')
    }, [user])

    function handleChange(event) {
        const { name, value } = event.target
        const newInputs = {
            ...inputs,
            [name]: value
        }
        setInputs(newInputs)
        lastDataSet.current = name
    }

    function handleChangeEdit(event) {
        const { name, value } = event.target
        setInputsEdit(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleChangeNumberPhone(newNumberPhone) {
        setInputs(prevInputs => ({
            ...prevInputs,
            numberPhone: newNumberPhone
        }))
        lastDataSet.current = 'numberPhone'
    }

    function verifyUser() {
        const { email, password } = inputs
        const errors = {}
        if ( !email ) errors.email = 'El email no puede estar vacio'
        if ( !password ) errors.password = 'La contraseña no puede estar vacia'
        if ( errors.email || errors.password) return setErrors(errors)
        return fetch(`${PATH_BACK}/users/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => data)
    }

    async function logInUser() {
        const response = await verifyUser()
        if (!response) return
        if (response.message && response.message === 'Contraseña incorrecta') return setErrors({password: 'Contraseña incorrecta'})
        if (response.message) return console.log('Error:', response.message)
        const userFront = userDataFromBackToFront(response) 
        handleAddUser(userFront)
        setInputs(userFront)
        console.log('Se ha iniciado sesión exitosamente')
    }

    async function changePassword() {
        // Evaluate Errors
        const newErors = lastValidation(inputsEdit)
        if (newErors.password || newErors.passwordConfirmation) return setErrors(newErors)
        
        // Verify correct password
        const isCorrectPassword = await verifyProperty({ property: 'password', value: inputsEdit.passwordConfirmation })

        // If verify is false
        if (!isCorrectPassword) {
            setErrors({ passwordConfirmation: 'Contraseña incorrecta' })
            return console.log('password no changed')
        }
        // if Verify is true
        const propertyToUpdate = oneUserDataFromFrontToBack({ property: 'password', value: inputsEdit.password })
        const response = await updateMyAccount(propertyToUpdate)
        if ( response.message !== 'se han actuliazado exitosamente' ) {
            return console.log(response.message)
        }
        setInputsEdit(initialInputsEdit)
        console.log(response.message)
        return true
    }

    async function changeEmail() {
        // Evaluate Errors
        if (errors.email) return
        const newErrors = lastValidation(inputsEdit)
        if (newErrors.password || newErrors.email) {
            return setErrors(newErrors)
        }
        
        // Verify correct password
        const isCorrectPassword = await verifyProperty({ property: 'password', value: inputsEdit.password })

        // If verify is false
        if (!isCorrectPassword) {
            setErrors({ password: 'Contraseña incorrecta' })
            console.log('password no changed')
            return false
        }

        // if Verify is true
        const propertyToUpdate = oneUserDataFromFrontToBack({ property: 'email', value: inputsEdit.email })
        const response = await updateMyAccount(propertyToUpdate)
        if ( response.message !== 'se han actuliazado exitosamente' ) {
            return console.log(response.message)
        }
        handleUpdateUser({
            ...user,
            email: inputsEdit.email,
            password: inputsEdit.password
        })
        setInputsEdit(initialInputsEdit)
        console.log(response.message)
        return true
    }

    async function signOff() {
        const {message} = await requestLogout()
        if (message === 'No hay usuario con la sesión activa') return
        setInputs(initialInputs)
        handleRemoveUser()
        console.log(message)
    }

    async function handleEditing(event) {
        const { name } = event.currentTarget
        if (!editing[name]) {
            return setEditing((prevEdit) => ({
                ...prevEdit,
                [name]: !editing[name]
            }))
        }
        const newErrors = lastValidation(inputs)
        if (newErrors[name]) return setErrors({ [name]: newErrors[name] })
        setEditing((prevEdit) => ({
            ...prevEdit,
            [name]: !editing[name]
        }))
        const propertyToUpdate = oneUserDataFromFrontToBack({ property: name, value: inputs[name] })
        const response = await updateMyAccount(propertyToUpdate)
        if ( response.message !== 'se han actuliazado exitosamente') return console.log(response.message)
        handleUpdateUser(inputs)
        console.log(response.message)
    }

    async function signUp() {
        const { email, password, name, numberPhone } = inputs
        const errors = {}
        if ( !email ) errors.email = 'El email no puede estar vacio'
        if ( !password ) errors.password = 'La contraseña no puede estar vacia'
        if ( !name ) errors.name = 'El nombre no puede estar vacio'
        if ( !numberPhone ) errors.numberPhone = 'El número no puede estar vacio'
        else {
            const [code, place, number] = inputs.numberPhone.split(" ")
            if (!code) errors.numberPhone = 'Coloca el código del país'
            if (!(place + number).length) errors.numberPhone = 'El número no puede estar vacio'
            if ( place && !isPossiblePhoneNumber(inputs.numberPhone)) errors.numberPhone = 'Número de teléfono inválido'
        }
        if ( errors.email || errors.password || errors.name || errors.numberPhone ) return setErrors(errors)
        const userBack = userDataFromFrontToBack({ email, password, name, numberPhone})
        const response = await newAccount(userBack)
        if (response.message) return console.log('Error:', response.message)
        const userFront = userDataFromBackToFront(response) 
        handleAddUser(userFront)
        setInputs(userFront)
        console.log('Se ha iniciado sesión exitosamente')
    }

    return {
        inputs,
        inputsEdit,
        handleChange,
        handleChangeEdit,
        errors,
        errorsEdit,
        currentUser: currentUser,
        userLoged,
        user,
        editing,
        handleChangeNumberPhone,
        logInUser,
        changePassword,
        changeEmail,
        signUp,
        signOff,
        handleEditing
    }
}

export default useHandleUser