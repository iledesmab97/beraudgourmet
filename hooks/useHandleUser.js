import { useState, useEffect, useMemo } from "react"
import useGetUser from '@/hooks/useGetUser'
import useDebounce from "./useDebounce"
import users from '@/users.json'

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

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

    const { user, handleAddUser,  } = useGetUser()
    const [userLoged, setUserLoged] = useState( user.email ? user : null)
    const [inputs, setInputs] = useState(() => userLoged ? userLoged : {
        email: '',
        name: '',
        password: '',
        numberPhone: '+52'
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
        if (!user.name) return
        const setAgain = !userLoged || Object.keys(user).some(property => {
            userLoged[property] !== inputs[property]
        })
        if (setAgain) {
            setUserLoged(user)
            setInputs(user)
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

    return {
        inputs,
        handleChange,
        errors,
        currentUser,
        userLoged,
        handleChangeNumberPhone,
        verifyUser
    }
}

export default useHandleUser