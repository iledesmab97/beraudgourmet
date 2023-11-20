import { useState } from "react"
import usePlacesAutocomplete from 'use-places-autocomplete'
import useDebounce from "./useDebounce"

const center = {
    lat: 19.43174631841264,
    lng: -99.23890595340924
  }

export default function usePlaceFinder({ inputAddress , distanceSaved}) {

    const [address, setAddress] = useState(() => inputAddress ? inputAddress : '')
    const [selectedSuggestion, setSelectedSuggestion] = useState(null)
    const [distance, setDistance] = useState(() => distanceSaved ? distanceSaved : null)
    const [withinLimit, setWidthinLimit]= useState(() => {
      if (!distance) return null
      if (distance > 15) return false
      if (distance <= 15) return true
      return null
    })

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

    function handleSetAddress (value) {
      setAddress(value)
    } 

    function handleInputChange (event) {
      if (!event) return
      debounceSetValue(() => setValue(event.target.value), 500)
      handleSetAddress(event.target.value)
    }

    function handleSelect (event, value, reason) {
      const suggestion = event.target.textContent
      // let suggestion
      // if (value) {
      //     suggestion = value.description
      // } else {
      //     suggestion = ''
      // }
      setSelectedSuggestion(value);
      handleSetAddress(suggestion)
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
      changeWithinLimit(newDistance.split('km')[0].trim())
    }

    function changeWithinLimit (value) {
      if (!value) return setWidthinLimit(null)
      if (value > 15) return setWidthinLimit(false)
      if (value <= 15) return setWidthinLimit(true)
      setWidthinLimit(null)
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
        withinLimit,
        handleSetAddress,
        handleSelect,
        handleInputChange
    }
}