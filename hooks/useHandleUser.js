import { useState, useEffect, useMemo, useRef } from "react"
import useGetUser from '@/hooks/useGetUser'
import useDebounce from "./useDebounce"
import users from '@/users.json'

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
        if (!(!place || (place && number && (place.length + number.length === 10)))) errors.numberPhone = 'Número de teléfono inválido'
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
    const user = users.filter(user => email === user.email)[0]
    return user ? user : null
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
    const [editing, setEditing] = useState(false)
    const { debounceSetValue } = useDebounce()
    const lastDataSet = useRef('')

    const currentUser = useRef(searchUser(inputs.email))

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputs))
            if (!userLoged) currentUser.current = searchUser(inputs.email)
            // if (userLoged && user[lastDataSet.current] !== inputs[lastDataSet.current]) {
            //     handleUpdateUser(inputs)
            // }
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
        if (currentUser.current.password === inputs.password) {
            logInUser()
        }
        else {
            setErrors({password: 'Contraseña incorrecta'})
        }
    }

    function logInUser() {
        handleAddUser(currentUser.current)
        setInputs(currentUser.current)
        currentUser.current = null
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
        handleUpdateUser({
            ...user,
            email: inputsEdit.email,
            password: inputsEdit.password
        })
        setInputsEdit(initialInputsEdit)
        return 'successful'
    }

    function signOff() {
        setInputs(initialInputs)
        handleRemoveUser()
    }

    function handleEditing() {
        if (Object.keys(errors).length) return
        const newErrors = lastValidation(inputs)
        if (Object.keys(newErrors).length) return setErrors(newErrors)
        if (editing) {
            handleUpdateUser(inputs)
        }
        setEditing(!editing)
    }

    return {
        inputs,
        inputsEdit,
        handleChange,
        handleChangeEdit,
        errors,
        currentUser: currentUser.current,
        userLoged,
        user,
        editing,
        handleChangeNumberPhone,
        verifyUser,
        changePassword,
        changeEmail,
        signOff,
        handleEditing
    }
}

export default useHandleUser