'use client'

import React, { useEffect, useState, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { GoogleMap } from '@react-google-maps/api'
import usePlacesAutocomplete from 'use-places-autocomplete'
import ItemPlace from './ItemPlace'

const center = {
  lat: 19.4307,
  lng: -99.2385
};

function PlaceFinder({ changeWithinLimit, withinLimit }) {
  const [address, setAddress] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [distance, setDistance] = useState('')
  
  const timerRef = useRef()

  // const [duration, setDuration] = useState('')

  // Configura usePlacesAutocomplete
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

  useEffect(() => {
    if (!distance) return
    if (distance > 15) {
      changeWithinLimit(false)
    } else {
      changeWithinLimit(true)
    }
  }, [distance])

  function debounceSetValue (value, time) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setValue(value)
    }, time);
  }

  function handleInputChange (e) {
    if (!e) return
    debounceSetValue(e.target.value, 500)
    setAddress(e.target.value)
  };

  function handleSelect (event) {
    const suggestion = event.target.textContent
    setAddress(suggestion);
    setSelectedSuggestion(suggestion);
    setValue(suggestion, false); // false para no borrar el valor del campo
    clearSuggestions();
    calculateRoute(event.target.textContent)
  };

  async function calculateRoute(address) {
    if (!address) return
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

  function clearRoute() {
    setDistance(results.routes[0].legs[0].distance.text)
    setAddress('')
    selectedSuggestion(null)
  }

  return (
    <>
    <Autocomplete
      fullWidth
      disablePortal
      id='autocomplete-PlaceFinder'
      options={ address ? data : []}
      getOptionLabel={option => option.description ? option.description : option}
      renderOption={
        (props, option) => (
          <ItemPlace
            {...props}
            place={option.description}
            key={option.description}
            // onClick={() => {calculateRoute}}
          />
      )}
      value={selectedSuggestion}
      onChange={handleSelect}
      inputValue={address}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          // waitTime={500}
          label='Place'
          error={withinLimit === null ? false : !withinLimit}
          helperText={ withinLimit === null || withinLimit ? '' : `Maxima destancia 15 km. Distancia actual: ${distance} km` } 
        />)}
    />
    {/* <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height: '500px'}}/> */}
    </>
  );
}

export default PlaceFinder;
