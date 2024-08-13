"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import { GoogleMap } from '@react-google-maps/api'
import ItemPlace from "./ItemPlace";

import { Box, CircularProgress, Paper } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import usePlaceFinder from "@/hooks/usePlaceFinder";
import useGetPlace from "@/hooks/useGetPlace";

function PlaceFinder({
    changeWithinLimitSaved,
    withinLimitSaved,
    handleInputsAddress,
    inputAddress,
    distanceSaved,
    inputsHome,
    closerStore,
    handleDistanceSaved,
    handleCloserStore,
}) {
    const stores = useSelector((state) => state.storeList.stores);
    const { place } = useSelector(state => state)
    const { handleMakePlace } = useGetPlace();
    
    const {
        address,
        data,
        status,
        selectedSuggestion,
        distance,
        withinLimit,
        storeMoreClose,
        handleSelect,
        handleInputChange,
    } = usePlaceFinder({ inputAddress, distanceSaved, closerStore, stores });

    useEffect(() => {
        if (address === inputAddress) return;
        handleInputsAddress(address);
    }, [address, selectedSuggestion]);

    useEffect(() => {
        if (distance !== distanceSaved) handleDistanceSaved(distance);
        if (withinLimit !== withinLimitSaved)
            changeWithinLimitSaved(withinLimit);
    }, [distance]);

    useEffect(() => {
        if (!storeMoreClose) return
        handleMakePlace({
            inputsHome,
            closerStore: storeMoreClose,
            typeDelivery: {
                name: "home",
                totalName: "Entrega a domicilio",
            }
        })
    }, [storeMoreClose]);

    useEffect(() => {
        handleCloserStore(storeMoreClose)
    }, [place])

    return (
        <>
            <Autocomplete
                fullWidth
                disablePortal
                id="autocomplete-PlaceFinder"
                // noOptionsText={null}
                options={address ? data : []}
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
                inputValue={address}
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
                        error={withinLimit === null ? false : !withinLimit}
                        helperText={
                            withinLimit === null || withinLimit
                                ? ""
                                : `Maxima destancia 5 km. Distancia actual: ${distance} km`
                        }
                    />
                )}
                noOptionsText={
                    address === "" ? (
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
