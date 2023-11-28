import { useState, useEffect, useMemo } from "react"
import useGetUser from '@/hooks/useGetUser'
import useDebounce from "./useDebounce"
import users from '@/users.json'

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

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
    if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese el correo electrónico'
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

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputs))
            setCurrentUser(searchUser(inputs.email))
        }, 500)
    }, [inputs])

    useEffect(() => {
        debounceSetValue(() => {
            setErrors(validation(inputsEdit))
        }, 500)
    }, [inputsEdit.email])

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
    }

    function verifyUser() {
        if (currentUser.password === inputs.password) {
            handleAddUser(currentUser)
            setUserLoged(currentUser)
            setInputs(currentUser)
            return setErrors({})   
        }
        setErrors({password: 'Contraseña incorrecta'})
    }

    function changePassword() {
        if (user.password === inputsEdit.passwordConfirmation) {
            handleUpdateUser({data:'password', value: inputsEdit.password})
            setInputsEdit(initialInputsEdit)
            return 'password changed'
        }
        setErrors({ passwordConfirmation: 'Contraseña incorrecta' })
        return 'password no changed'
    }

    function changeEmail() {
        if (errors.email) return
        handleUpdateUser({ data: 'email', value: inputsEdit.email })
        handleUpdateUser({ data: 'password', value: inputsEdit.password })
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