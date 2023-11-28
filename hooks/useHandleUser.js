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
    passwordConfimation: '',
    newPassword: ''
}

function validation(inputs) {
    const errors = {}
    if ( inputs.email && !validEmail.test(inputs.email)) errors.email = 'Ingrese el correo electrónico'
    return errors
}

function correctPassword(inputs, currentUser) {
    if (currentUser.password === inputs.password) return true
}

function searchUser(email) {
    const user = users.filter(user => email === user.email)[0]
    return user
}

function useHandleUser() {

    const { user, handleAddUser,  } = useGetUser()
    const [userLoged, setUserLoged] = useState( user.email ? user : null)
    const [inputs, setInputs] = useState(() => userLoged ? {
        email: userLoged.email,
        name: userLoged.name,
        password: userLoged.password,
        numberPhone: userLoged.numberPhone,
        passwordConfimation: '',
        newPassword: ''
    } : initialInputs)
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
        if (user.password === inputs.passwordConfimation) {
            const newInputs = {
                ...inputs,
                password: inputs.newPassword,
                newPassword: '',
                passwordConfimation: ''
            }
            handleAddUser(newInputs)
            return setInputs(initialInputs)
        }
        return setErrors({passwordConfimation: 'Contraseña incorrecta'})
    }

    return {
        inputs,
        handleChange,
        errors,
        currentUser,
        userLoged,
        handleChangeNumberPhone,
        verifyUser,
        changePassword
    }
}

export default useHandleUser