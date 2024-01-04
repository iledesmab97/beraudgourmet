import { useState, useEffect, useMemo, useRef } from "react"
import useGetUser from '@/hooks/useGetUser'
import useDebounce from "./useDebounce"
import { isPossiblePhoneNumber } from 'libphonenumber-js'

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
    if (inputs.numberPhone !== undefined) {
        if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese un correo válido'
        if ( inputs.name && !validNombre.test(inputs.name) ) errors.name = 'No colocar números ni caracteres especiales'
        const [code, place, number] = inputs.numberPhone.split(" ")
        if (!code) errors.numberPhone = 'Coloca el código del país'
        if ( place && !isPossiblePhoneNumber(inputs.numberPhone)) errors.numberPhone = 'Número de teléfono inválido'
    } else {
        if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese un correo válido'
        if ( inputs.name && !validNombre.test(inputs.name) ) errors.name = 'No colocar números ni caracteres especiales'
    }
    return errors
}

function lastValidation(inputs) {
    const errors = {}
    if (inputs.numberPhone !== undefined) {
        if ( !inputs.email ) errors.name = 'Este campo no puede estar vacio'
        if ( !inputs.name ) errors.name = 'Este campo no puede estar vacio'
        if ( !inputs.password ) errors.name = 'Este campo no puede estar vacio'
        if ( !inputs.numberPhone ) errors.name = 'Este campo no puede estar vacio'
    } else {
        if ( !inputs.email ) errors.email = 'Este campo no puede estar vacio'
        if ( !inputs.password ) errors.password = 'Este campo no puede estar vacio'
        if ( !inputs.passwordConfirmation ) errors.passwordConfirmation = 'Este campo no puede estar vacio'
    }
    return errors
}

function searchUser(email) {
    if (!email) return null
    return fetch(`http://localhost:3000/api/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
}

function requestLogout() {
    return fetch('http://localhost:3000/api/users/logout', {
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
    const [editing, setEditing] = useState({name: false, number: false})
    const { debounceSetValue } = useDebounce()
    const lastDataSet = useRef('')

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputs))
            if (!userLoged && (lastDataSet.current === 'email')) {
                searchUser(inputs.email)
                    .then(data => {
                        if (!data) return setCurrentUser(null)
                        const {email, name, password} = data
                        setCurrentUser({
                        email,
                        password,
                        name,
                        numberPhone: data.phoneNumber
                    })
                })
            }
        }, 500)
    }, [inputs])

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputsEdit))
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

    function handleChange(event) {
        const { name, value } = event.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
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
        return fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => data)
    }

    async function logInUser() {
        const response = await verifyUser()
        if (response.message && response.message === 'Contraseña incorrecta') return setErrors({password: 'Contraseña incorrecta'})
        if (response.message) return console.log('Error:', response.message)
        const {id, name, email, phoneNumber, promotion} = response
        const dataUser = {
            id,
            name,
            email,
            numberPhone: phoneNumber,
            promotion
        } 
        handleAddUser(dataUser)
        setInputs(currentUser)
        console.log('Se ha iniciado sesión exitosamente')
    }

    function changePassword() {
        const newErors = lastValidation(inputsEdit)
        if (newErors.password || newErors.passwordConfirmation) return setErrors(newErors)
        if (user.password === inputsEdit.passwordConfirmation) {
            handleUpdateUser({
                ...user,
                password: inputsEdit.password
            })
            setInputsEdit(initialInputsEdit)
            return 'password changed'
        }
        setErrors({ passwordConfirmation: 'Contraseña incorrecta' })
        return 'password no changed'
    }

    function changeEmail() {
        if (errors.email) return
        const newErors = lastValidation(inputsEdit)
        if (!inputsEdit.email || !inputsEdit.password) {
            setErrors(newErors)
            return 'failed'
        }
        if (user.password === inputsEdit.password) {
            handleUpdateUser({
                ...user,
                email: inputsEdit.email,
                password: inputsEdit.password
            })
            setInputsEdit(initialInputsEdit)
            return 'successful'
        } else {
            setErrors({password: 'Contraseña incorrecta'})
            return 'failed'
        }
    }

    async function signOff() {
        const {message} = await requestLogout()
        if (message === 'No hay usuario con la sesión activa') return
        setInputs(initialInputs)
        handleRemoveUser()
        console.log(message)
    }

    function handleEditing(event) {
        const { name } = event.currentTarget
        if (Object.keys(errors).length) return
        const newErrors = lastValidation(inputs)
        if (Object.keys(newErrors).length) return setErrors(newErrors)
        if (editing[name]) {
            handleUpdateUser(inputs)
        }
        setEditing((prevEdit) => ({
            ...prevEdit,
            [name]: !editing[name]
        }))
    }

    return {
        inputs,
        inputsEdit,
        handleChange,
        handleChangeEdit,
        errors,
        currentUser: currentUser,
        userLoged,
        user,
        editing,
        handleChangeNumberPhone,
        logInUser,
        changePassword,
        changeEmail,
        signOff,
        handleEditing
    }
}

export default useHandleUser