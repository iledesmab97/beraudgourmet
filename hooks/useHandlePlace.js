import { useState, useEffect } from 'react'
import useGetPlace from './useGetPlace'

function useHandlePlace() {

    const [inputsStore, setInputsStore] = useState('')
    const [inputsHome, setInputsHome] = useState({})
    const {} = useGetPlace()

    useEffect(() =>{
        return () => {
            console.log('se esta cerrando ModalStoreDelivery')
        }
    // }, [inputsStore])
    }, [])

    function handleInputsStore(event) {
        // console.log(event.target.textContent)
        const newValue = event.target.textContent
        setInputsStore(newValue)
    }

    function handleInputsHome(event) {
        console.log(event.target.value)
    }

    return { inputsStore, inputsHome, handleInputsStore , handleInputsHome }
}

export default useHandlePlace