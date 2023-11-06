'use client'

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import usePlacesAutocomplete from 'use-places-autocomplete'
import ItemPlace from './ItemPlace'

function AutocompleteAddress() {
  const [address, setAddress] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // Configura usePlacesAutocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

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
  };

  return (
    <Autocomplete
      fullWidth
      disablePortal
      id='autocomplete-PlaceFinder'
      options={data}
      getOptionLabel={option => option.description ? option.description : option}
      renderOption={
        (props, option) => (
          <ItemPlace {...props} key={option.description} place={option.description}/>
      )}
      value={selectedSuggestion}
      onChange={handleSelect}
      inputValue={address}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label='Place' />}
    />
  );
}

export default AutocompleteAddress;
