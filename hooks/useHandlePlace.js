import { useState, useEffect } from 'react'
import useGetPlace from './useGetPlace'
import places from '@/typePlaces.json'

function useHandlePlace() {

    const [inputsStore, setInputsStore] = useState('Ciudad de México')
    const [place, setPlace] = useState(places.home)
    const [inputsHome, setInputsHome] = useState({
        inputAddress: '',
        street: {
            ['unity']: '',
            ['number']: '',
            ['streetName']: ''
        },
        city: '',
        postalCode: '',
        note: '',
        type: {
            name: place.name,
            totalName: place.totalName
        }
    })
    const [closerStore, setCloserStore] = useState(null)
    const [withinLimitSaved, setWidthinLimitSaved] = useState(null)
    const [distanceSaved, setDistanceSaved] = useState(null)
    const {} = useGetPlace()

    useEffect(() => {
        const newStreet = {}
        const newOther = {}
        place.street.forEach(item => {
            if (inputsHome.street[item.name]) {
                newStreet[item.name] = inputsHome.street[item.name]
            } else {
                newStreet[item.name] = ''
            }
        })
        if (place.other) {
            place.other.inputs.forEach(item => {
                newOther[item.name] = ''
            })
        }
        setInputsHome(prevInputsHome => ({
            ...prevInputsHome,
            street: newStreet,
            other: newOther,
            type: {
                name: place.name,
                totalName: place.totalName
            }
        }))
    }, [place])

    function handleCloserStore(newCloserStore) {
        setCloserStore(newCloserStore)
    }

    function handlePlaceType(event) {
        setPlace(places[event.target.value])
    }

    function changeWithinLimitSaved(value) {
        setWidthinLimitSaved(value)
    }

    function handleDistanceSaved(value) {
        setDistanceSaved(value)
    }

    function handleInputsStore(event) {
        const newValue = event.target.textContent
        if (!newValue) return
        setInputsStore(newValue)
    }

    function handleInputsAddress(value) {
        setInputsHome(prevInputsHome => ({
            ...prevInputsHome,
            inputAddress: value
        }))
    }

    function handleInputsHome(event) {
        const {value, name } = event.target
        if (name === 'streetName' || name === 'number' || name === 'unity') {
            const newInputs = {
                ...inputsHome,
                street: {
                    ...inputsHome.street,
                    [name]: value
                }
            }
            setInputsHome(newInputs)
        } else if (name === 'city' || name === 'postalCode' || name === 'note') {
            const newInputs = {
                ...inputsHome,
                [name]: value
            }
            setInputsHome(newInputs)
        } else {
            const newInputs = {
                ...inputsHome,
                other: {
                    ...inputsHome.other,
                    [name]: value
                }
            }
            setInputsHome(newInputs)
        }
    }

    return {
        inputsStore,
        inputsHome,
        place,
        withinLimitSaved,
        distanceSaved,
        closerStore,
        changeWithinLimitSaved,
        handleInputsStore,
        handleInputsAddress,
        handleDistanceSaved,
        handleInputsHome,
        handlePlaceType,
        handleCloserStore
    }
}

export default useHandlePlace