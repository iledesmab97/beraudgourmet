import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { useLoadScript } from "@react-google-maps/api";

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
    setValue(e.target.value);
    setAddress(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setAddress(suggestion.description);
    setSelectedSuggestion(suggestion);
    setValue(suggestion.description, false); // false para no borrar el valor del campo
    clearSuggestions();
  };

  return (
    <div>
      <input
        value={address}
        onChange={handleInputChange}
        placeholder="Enter an address"
      />
      <ul>
        {status === 'OK' &&
          data.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion.description}
            </li>
          ))}
      </ul>
      {selectedSuggestion && (
        <div>
          <h2>Selected Address:</h2>
          <p>{selectedSuggestion.description}</p>
          <button onClick={() => setSelectedSuggestion(null)}>Clear Selection</button>
        </div>
      )}
    </div>
  );
}

export default AutocompleteAddress;
