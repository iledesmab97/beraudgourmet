import { useState, useEffect } from "react"
import usePlacesAutocomplete from 'use-places-autocomplete'
import useDebounce from "./useDebounce"

const center = {
    lat: 19.4307,
    lng: -99.2385
  }

export default function usePlaceFinder() {

    const [address, setAddress] = useState('')
    const [selectedSuggestion, setSelectedSuggestion] = useState(null)
    const [distance, setDistance] = useState('')

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          componentRestrictions: { country: 'MX' }
        }
      });

    const { debounceSetValue } = useDebounce()

    function handleInputChange (event, value) {
        if (!event) return
        debounceSetValue(() => setValue(value), 500)
        setAddress(value)
    }

    function handleSelect (event, value, reason) {
        // const suggestion = event.target.textContent
        let suggestion
        if (value) {
            suggestion = value.description
        } else {
            suggestion = ''
        }
        setSelectedSuggestion(value);
        setAddress(suggestion)
        setValue(suggestion, false) // false para no borrar el valor del campo
        clearSuggestions()
        calculateRoute(suggestion)
    }

    async function calculateRoute(address) {
        if (!address) return setDistance(null)
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
          origin: center,
          destination: address,
          // travelMode: google.maps.TravelMode.DRIVING
          travelMode: 'DRIVING'
        })
        let newDistance = results.routes[0].legs[0].distance.text
        if (newDistance.includes('.')) {
          newDistance = newDistance.replaceAll('.', '')
        }
        if (newDistance.includes(',')) {
          newDistance = newDistance.replace(',', '.')
        }
        setDistance(newDistance.split('km')[0].trim())
    }

    // function clearRoute() {
    //     setDistance(results.routes[0].legs[0].distance.text)
    //     setAddress('')
    //     selectedSuggestion(null)
    // }

    return {
        address,
        data,
        selectedSuggestion,
        distance,
        handleSelect,
        handleInputChange
    }
}