'use client'

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { GoogleMap } from '@react-google-maps/api'
import usePlacesAutocomplete from 'use-places-autocomplete'
import ItemPlace from './ItemPlace'

const center = {
  lat: 19.4307,
  lng: -99.2385
};

function AutocompleteAddress() {
  const [address, setAddress] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [distance, setDistance] = useState('')
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

  function handleInputChange (e) {
    if (!e) return
    setValue(e.target.value);
    setAddress(e.target.value);
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
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: center,
      destination: address,
      // travelMode: google.maps.TravelMode.DRIVING
      travelMode: 'DRIVING'
    })
    setDistance(results.routes[0].legs[0].distance.text.split('km')[0].trim())
    console.log('distancia:', results.routes[0].legs[0].distance.text.split('km')[0].trim())
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
      options={data}
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
          label='Place'
          error={distance > 15 ? true : false}
          helperText={ distance > 15 ? 'Maxima destancia 15 km' : '' } 
        />)}
    />
    {/* <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height: '500px'}}/> */}
    </>
  );
}

export default AutocompleteAddress;
