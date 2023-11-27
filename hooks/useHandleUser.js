import { useState, useEffect, useMemo } from "react"
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

    const [inputs, setInputs] = useState({
        email: '',
        name: '',
        password: '',
        phoneNumber: '+52'
    })
    const [errors, setErrors] = useState(validation(inputs))
    const [userLoged, setUserLoged] = useState(null)

    useEffect(() => {
        setErrors(validation(inputs))
    }, [inputs])

    const currentUser = useMemo(() => {
        return searchUser(inputs.email)
    }, [inputs.email])

    function handleChange(event) {
        const { name, value } = event.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleChangePhoneNumber(newPhoneNumber) {
        setInputs(prevInputs => ({
            ...prevInputs,
            phoneNumber: newPhoneNumber
        }))
    }

    function verifyUser() {
        if (currentUser.password === inputs.password) {
            console.log('verificación exitosa')
            setUserLoged(currentUser)
            return setErrors({})   
        }
        console.log('verificación erronea')
        setErrors({password: 'Contraseña incorrecta'})
    }

    function changeUser(newUser) {
        setUser(newUser)
    }

    return { inputs, handleChange, errors, currentUser, userLoged, handleChangePhoneNumber, verifyUser}
}

export default useHandleUser