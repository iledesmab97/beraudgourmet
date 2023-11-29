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
        if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese el correo electrónico'
    }
    return errors
}

function searchUser(email) {
    const user = users.filter(user => email === user.email)[0]
    return user
}

function useHandleUser() {

    const { user, handleAddUser, handleUpdateUser } = useGetUser()
    const [userLoged, setUserLoged] = useState( user.email ? user : null)
    const [inputs, setInputs] = useState(() => userLoged ? {
        email: userLoged.email,
        name: userLoged.name,
        password: userLoged.password,
        numberPhone: userLoged.numberPhone
    } : initialInputs)
    const [inputsEdit, setInputsEdit] = useState({
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState(validation(inputs))
    const [currentUser, setCurrentUser] = useState(() => searchUser(inputs.email))
    const { debounceSetValue } = useDebounce()
    const lastDataSet = useRef('')

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputs))
            if (!userLoged) setCurrentUser(searchUser(inputs.email))
            if (userLoged && user[lastDataSet.current] !== inputs[lastDataSet.current]) {
                handleUpdateUser(inputs)
            }
        }, 500)
    }, [inputs])

    useEffect(() => {
        if (user.name) {
            setUserLoged(user)
            setInputs({
                email: user.email,
                name: user.name,
                password: user.password,
                numberPhone: user.numberPhone,
                passwordConfimation: '',
                newPassword: ''
            })
        } else if (userLoged) {
            setUserLoged(null)
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
        if (currentUser.password === inputs.password) {
            logInUser()
        }
        else {
            setErrors({password: 'Contraseña incorrecta'})
        }
    }

    function logInUser() {
        handleAddUser(currentUser)
        setUserLoged(currentUser)
        setInputs(currentUser)
    }

    function changePassword() {
        if (user.password === inputsEdit.passwordConfirmation) {
            handleUpdateUser({
                ...userLoged,
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
        handleUpdateUser({
            ...userLoged,
            email: inputsEdit.email,
            password: inputsEdit.password
        })
        setInputsEdit(initialInputsEdit)
    }

    return {
        inputs,
        inputsEdit,
        handleChange,
        handleChangeEdit,
        errors,
        currentUser,
        userLoged,
        handleChangeNumberPhone,
        verifyUser,
        changePassword,
        changeEmail
    }
}

export default useHandleUser