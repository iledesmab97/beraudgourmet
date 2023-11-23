'use client'

import { useEffect } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete'
import usePlaceFinder from '@/hooks/usePlaceFinder'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import { GoogleMap } from '@react-google-maps/api'
import ItemPlace from './ItemPlace'

function PlaceFinder({
  changeWithinLimitSaved,
  withinLimitSaved,
  handleInputsAddress,
  inputAddress,
  distanceSaved,
  handleDistanceSaved,
  handleCloserStore
}) {

  const {
    address,
    data,
    selectedSuggestion,
    distance,
    withinLimit,
    storeMoreClose,
    handleSelect,
    handleInputChange 
  } = usePlaceFinder({ inputAddress, distanceSaved })

  useEffect(() => {
    if (address === inputAddress) return
    handleInputsAddress(address)
  }, [address, selectedSuggestion])

  useEffect(() => {
    if (distance === distanceSaved) return
    handleDistanceSaved(distance)
  }, [distance])

  useEffect(() => {
    if (withinLimit === withinLimitSaved) return
    changeWithinLimitSaved(withinLimit)
  }, [withinLimit])

  useEffect(() => {
    handleCloserStore(storeMoreClose)
  },[storeMoreClose])

  return (
    <>
    <Autocomplete
      fullWidth
      disablePortal
      id='autocomplete-PlaceFinder'
      // noOptionsText={null}
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
      isOptionEqualToValue={(option, value) => {
        return option.description === value.description
      }}
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
