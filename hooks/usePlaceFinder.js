import { useState, useMemo } from "react"
import usePlacesAutocomplete from 'use-places-autocomplete'
import useDebounce from "./useDebounce"
import stores from '@/stores.json'

const center = {
    lat: 19.43174631841264,
    lng: -99.23890595340924
  }

export default function usePlaceFinder({ inputAddress , distanceSaved, closerStore}) {

    const [address, setAddress] = useState(() => inputAddress ? inputAddress : '')
    const [selectedSuggestion, setSelectedSuggestion] = useState(null)
    const [distance, setDistance] = useState(() => distanceSaved ? distanceSaved : null)
    const withinLimit = useMemo(() => {
      if (!distance) return null
      if (distance > 15) return false
      if (distance <= 15) return true
      return null
    }, [distance])
    const [storeMoreClose, setStoreMoreClose] = useState(closerStore)

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
      let newDistance = Infinity
      let cityStore
      let closerStore 
      const arrayCitys = Object.values(stores)
      for (const city of arrayCitys) {
        // cityStore = city.name
        if (cityStore && cityStore !== city.name) break
        for (const store of city.stores) {
          const results = await directionService.route({
            // origin: center,
            origin: store.coordinates,
            destination: address,
            // travelMode: google.maps.TravelMode.DRIVING
            travelMode: 'DRIVING'
          })
          let currentDistance = results.routes[0].legs[0].distance.text
          if (currentDistance.includes('.')) {
            currentDistance = currentDistance.replaceAll('.', '')
          }
          if (currentDistance.includes(',')) {
            currentDistance = currentDistance.replace(',', '.')
          }
          if (currentDistance.includes('km')) {
            currentDistance = currentDistance.split('km')[0].trim()
          } else if (currentDistance.includes('m')) {
            currentDistance = currentDistance.split('m')[0].trim()/1000
          }
          if (Number(currentDistance) < Number(newDistance)) {
            newDistance = currentDistance
            closerStore = store
            if (newDistance <= 15) cityStore = city.name
            if (newDistance < 1) break
          }
        }
      }
      setDistance(newDistance)
      setStoreMoreClose(closerStore)
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
        storeMoreClose,
        handleSetAddress,
        handleSelect,
        handleInputChange
    }
}