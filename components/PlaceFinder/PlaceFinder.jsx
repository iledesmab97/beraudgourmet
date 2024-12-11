"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import { GoogleMap } from '@react-google-maps/api'
import ItemPlace from "./ItemPlace";

import { Box, CircularProgress, Paper } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import usePlaceFinder from "@/hooks/usePlaceFinder";

import { makePlace } from "@/stores/place/slice";

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
    changeInpusHome
}) {
    const { stores } = useSelector((state) => state.storeList);
    const storesWithDeliverySchedule = useRef(stores.filter(store => {
        return store.Schedules.some(schedule => schedule.type === "delivery")
    }))
    const { place } = useSelector(state => state)
    const dispatch = useDispatch()
    
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
        getTotalDataAddress,
        ready
    } = usePlaceFinder({ inputAddress, distanceSaved, closerStore, stores: storesWithDeliverySchedule.current });

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
        if (!storeMoreClose || !withinLimitSaved) return
        updatePlace()
    }, [storeMoreClose, withinLimitSaved]);

    useEffect(() => {
        handleCloserStore(storeMoreClose)
    }, [place])

    async function fillDataInputsHome(address) {
        return await getTotalDataAddress({ address })
    }

    async function updatePlace() {
        const { inputAddress } = inputsHome
        const { streetNumber, route, city, state, zipCode, country, coordinates } = await fillDataInputsHome(inputAddress)
        const newInputHome = {
            ...inputsHome,
            city,
            postalCode: zipCode,
            street: {
                number: streetNumber,
                streetName: route
            },
            state,
            country,
            coordinates
        }
        const newPlace = {
            inputsHome: newInputHome,
            closerStore: storeMoreClose,
            typeDelivery: {
                name: "home",
                totalName: "Entrega a domicilio",
            }
        }
        dispatch(makePlace(newPlace))
        changeInpusHome(newInputHome)
    }

    return (
        <>
            <Autocomplete
                fullWidth
                disablePortal
                disabled={!ready}
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
