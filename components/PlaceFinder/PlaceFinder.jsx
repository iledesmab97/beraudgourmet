'use client'

import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import usePlacesAutocomplete from 'use-places-autocomplete';

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

  const handleInputChange = (e) => {
    if (!e) return
    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleSelect = (event) => {
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
      renderOption={(props, option) => <li {...props} key={option.description}>{option.description}</li>}
      value={selectedSuggestion}
      onChange={handleSelect}
      inputValue={address}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label='Place' />}
    />
    // <div>
    //   <input
    //     value={address}
    //     onChange={handleInputChange}
    //     placeholder="Enter an address"
    //   />
    //   <ul>
    //     {status === 'OK' &&
    //       data.map((suggestion, index) => (
    //         <li key={index} onClick={() => handleSelect(suggestion)}>
    //           {suggestion.description}
    //         </li>
    //       ))}
    //   </ul>
    //   {selectedSuggestion && (
    //     <div>
    //       <h2>Selected Address:</h2>
    //       <p>{selectedSuggestion.description}</p>
    //       <button onClick={() => setSelectedSuggestion(null)}>Clear Selection</button>
    //     </div>
    //   )}
    // </div>
  );
}

export default AutocompleteAddress;
