"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PlaceFinder from "../PlaceFinder/PlaceFinder";
import FormModalDeliveryPlace from "../ModalDeliveryPlace/FormModalDeliveryPlace";

import useHandlePlace from "@/hooks/useHandlePlace";
import useHandleShoppingGuide from "@/hooks/useHandleShoppingGuide";

import QuoteComponent from "../UberComponents/QuoteComponent";
import { useEffect, useState } from "react";
import useGoogleMaps from "@/hooks/useGoogleMaps";

import { getLocalData } from "@/utils/manageLocalStorage";
import { useSelector } from "react-redux";

export default function HomeDelivery() {
    const { stores } = useSelector(state => state.storeList )
    const [ geolocation, setGeolocation ] = useState(null)
    const { calculateRoute } = useGoogleMaps()
    const {
        inputsHome,
        typeLocation,
        closerStore,
        handleInputsAddress,
        handleInputsHome,
        handleTypeLocation,
        updatePlace
    } = useHandlePlace({});
    const { nextStepGuide } = useHandleShoppingGuide();

    useEffect(() => {
        const newGeolocations = getLocalData("geolocation")
        if (!newGeolocations) return
        setGeolocation(newGeolocations)
    }, [])

    async function findMyPlace() {
        const { coordinates, inputAddress } = geolocation
        handleInputsAddress(inputAddress)
        const { distance: newDistance, closerStore: newCloserStore } = await calculateRoute({ addressCoordinates: coordinates, stores })
        if (!newDistance || !newCloserStore) return
        updatePlace({ inputAddress, distance: newDistance, closerStore: newCloserStore})
    }

    return (
        <>
            <Box
                id="HomeDelivery-container"
                sx={{
                    width: "100%",
                    maxHeight: {
                        xs: "335px",
                        sm: "490px",
                        md: "430px",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                    overflowY: "auto",
                    pr: 1,
                }}
            >
                <Typography
                    variant="title"
                    sx={{
                        alignSelf: "flex-start",
                    }}
                >
                    DIRECCIÓN DE ENTREGA
                </Typography>

                {
                    geolocation ? (
                        <>
                            <Button
                                variant="outlined"
                                onClick={findMyPlace}
                                sx={{
                                    alignSelf: "flex-start"
                                }}
                            >
                                Utilizar tu ubicación
                            </Button>

                            <Typography
                                sx={{
                                    alignSelf: "flex-start"
                                }}
                            >Ó</Typography>
                        </>
                    ) : null
                }

                <PlaceFinder
                    handleInputsAddress={handleInputsAddress}
                    inputsHome={inputsHome}
                    updatePlace={updatePlace}
                />

                {inputsHome.withinLimitSaved && closerStore ? (
                    <>
                        <QuoteComponent
                            text={{
                                width: "70%",
                            }}
                            spinner={{
                                large: "20%",
                            }}
                            helperText={{
                                textAlign: "right",
                                mt: 0,
                            }}
                            initialize={true}
                        />
                        <FormModalDeliveryPlace
                            inputsHome={inputsHome}
                            typeLocation={typeLocation}
                            closerStore={closerStore}
                            handleInputsHome={handleInputsHome}
                            handleTypeLocation={handleTypeLocation}
                            currentModal="place"
                            nextStep={nextStepGuide}
                        />
                    </>
                ) : null}
            </Box>
        </>
    );
}
