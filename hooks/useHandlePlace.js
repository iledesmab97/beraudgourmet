import { useState, useEffect } from 'react'
import useGetPlace from './useGetPlace'
import typeLocations from '@/typePlaces.json'

function useHandlePlace() {

    const {place} = useGetPlace()
    const [inputsStore, setInputsStore] = useState('Ciudad de México')
    const [typeLocation, setTypeLocation] = useState(() => {
        if (place.inputsHome) return typeLocations[place.inputsHome.type.name]
        return typeLocations.home
    })
    const [closerStore, setCloserStore] = useState(null)
    const [withinLimitSaved, setWidthinLimitSaved] = useState(null)
    const [inputsHome, setInputsHome] = useState(() => {
        if (place.inputsHome) return place.inputsHome
        return {
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
                name: typeLocation.name,
                totalName: typeLocation.totalName
            },
            distanceSaved: null
        }
    })
    const [distanceSaved, setDistanceSaved] = useState(() => {
        if (place.inputsHome) return place.inputsHome.distanceSaved
        return null
    })

    useEffect(() => {
        if ((place.inputsHome && place.inputsHome.inputAddress) !== (inputsHome.inputAddress)) setInputsHome(place.inputsHome)
        if ((place.closerStore && place.closerStore.name) !== (closerStore && closerStore.name))
        setCloserStore(place.closerStore)
    }, [place])

    useEffect(() => {
        if (inputsHome.distanceSaved !== distanceSaved) {
            setInputsHome((prevInputsHome) => ({
                ...prevInputsHome,
                distanceSaved: distanceSaved
            }))
        }
    }, [distanceSaved])

    useEffect(() => {
        const newStreet = {}
        const newOther = {}
        typeLocation.street.forEach(item => {
            if (inputsHome.street[item.name]) {
                newStreet[item.name] = inputsHome.street[item.name]
            } else {
                newStreet[item.name] = ''
            }
        })
        if (typeLocation.other) {
            typeLocation.other.inputs.forEach(item => {
                newOther[item.name] = ''
            })
        }
        setInputsHome(prevInputsHome => ({
            ...prevInputsHome,
            street: newStreet,
            other: newOther,
            type: {
                name: typeLocation.name,
                totalName: typeLocation.totalName
            }
        }))
    }, [typeLocation])

    function handleCloserStore(newCloserStore) {
        setCloserStore(newCloserStore)
    }

    function handleTypeLocation(event) {
        setTypeLocation(typeLocations[event.target.value])
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
        typeLocation,
        withinLimitSaved,
        distanceSaved,
        closerStore,
        changeWithinLimitSaved,
        handleInputsStore,
        handleInputsAddress,
        handleDistanceSaved,
        handleInputsHome,
        handleTypeLocation,
        handleCloserStore
    }
}

export default useHandlePlace