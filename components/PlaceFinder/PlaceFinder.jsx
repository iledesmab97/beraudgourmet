"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ItemPlace from "./ItemPlace";

import { Box, CircularProgress, Paper } from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";
import usePlacesAutocomplete from "use-places-autocomplete";
import useGoogleMaps from "@/hooks/useGoogleMaps";
import useDebounce from "@/hooks/useDebounce";

function PlaceFinder({
    handleInputsAddress,
    inputsHome,
    updatePlace
}) {

    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const { stores } = useSelector((state) => state.storeList);
    const { calculateRoute } = useGoogleMaps()
    const { debounceSetValue } = useDebounce()

    const sw = { lat: 19.392859721213277, lng: -99.28758348373333 };
    const ne = { lat: 19.487428244562256, lng: -99.11594403710876 };

    const bounds = new google.maps.LatLngBounds(sw, ne);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            // Change for locationBias and locationRestriction refer to google maps API docs
            locationRestriction: bounds,
            componentRestrictions: {
                country: "MX",
            },
        },
    });
    
    function handleInputChange(event) {
        if (!event) return;
        const { value } = event.target;
        handleInputsAddress(value);
        getOptions(value)
    }


    async function handleSelect(event, value, reason) {
        const description = value?.description ? value.description : "";
        setSelectedSuggestion(value);
        handleInputsAddress(description)
        if (description) {
            setValue(description, false); // false para no borrar el valor del campo
            clearSuggestions();
            const { distance: newDistance, closerStore: newCloserStore } =
                await calculateRoute({ address: description, stores });
            updatePlace({
                inputAddress: description,
                distance: newDistance,
                closerStore: newCloserStore,
            });
        }
    }

    function getOptions(value) {
        if (value) {
            debounceSetValue(() => setValue(value), 500);
        }
    }

    return (
        <>
            <Autocomplete
                fullWidth
                disablePortal
                disabled={!ready}
                id="autocomplete-PlaceFinder"
                // noOptionsText={null}
                options={inputsHome.inputAddress ? data : []}
                getOptionLabel={(option) =>
                    option.description ? option.description : option
                }
                renderOption={(props, option) => (
                    <ItemPlace
                        {...props}
                        place={option.description}
                        key={option.description}
                        // onClick={() => {calculateRoute}}
                    />
                )}
                value={selectedSuggestion}
                onChange={handleSelect}
                inputValue={inputsHome.inputAddress}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(option, value) => {
                    return option.description === value.description;
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        // waitTime={500}
                        label="Place"
                        size="small"
                        margin="dense"
                        error={inputsHome.withinLimitSaved === null ? false : !inputsHome.withinLimitSaved}
                        helperText={
                            inputsHome.withinLimitSaved === null || inputsHome.withinLimitSaved
                                ? ""
                                : `Maxima destancia 5 km. Distancia actual: ${inputsHome.distanceSaved} km`
                        }
                    />
                )}
                noOptionsText={
                    inputsHome.inputAddress === "" ? (
                        "Comienza a escribir..."
                    ) : status !== "OK" ? (
                        <Box display="flex" justifyContent="center" p={2}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : (
                        "No se encuentra el lugar"
                    )
                }
                // Ensure dropdown always opens below the input field
                PaperComponent={(props) => (
                    <Paper {...props} style={{ marginTop: 4 }} />
                )}
            />
            {/* <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height: '500px'}}/> */}
        </>
    );
}

export default PlaceFinder;
