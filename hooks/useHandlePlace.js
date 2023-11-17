import { useState, useEffect } from 'react'
import useGetPlace from './useGetPlace'

function useHandlePlace() {

    const [inputsStore, setInputsStore] = useState('')
    const [inputsHome, setInputsHome] = useState({
        inputAddress: ''
    })
    const [withinLimitSaved, setWidthinLimitSaved] = useState(null)
    const [distanceSaved, setDistanceSaved] = useState(null)
    const {} = useGetPlace()

    useEffect(() =>{
        return () => {
            console.log('se esta cerrando ModalStoreDelivery')
        }
    // }, [inputsStore])
    }, [])

    function changeWithinLimitSaved(value) {
        setWidthinLimitSaved(value)
    }

    function handleDistanceSaved(value) {
        setDistanceSaved(value)
    }

    function handleInputsStore(event) {
        // console.log(event.target.textContent)
        const newValue = event.target.textContent
        setInputsStore(newValue)
    }

    function handleInputsAddress(value) {
        setInputsHome(prevInputsHome => ({
            ...prevInputsHome,
            inputAddress: value
        }))
    }   

    return {
        inputsStore,
        inputsHome,
        withinLimitSaved,
        distanceSaved,
        changeWithinLimitSaved,
        handleInputsStore,
        handleInputsAddress,
        handleDistanceSaved
    }
}

export default useHandlePlace