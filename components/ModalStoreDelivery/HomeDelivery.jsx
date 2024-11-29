"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PlaceFinder from "../PlaceFinder/PlaceFinder";
import FormModalDeliveryPlace from "../ModalDeliveryPlace/FormModalDeliveryPlace";

import useHandlePlace from "@/hooks/useHandlePlace";
import useHandleShoppingGuide from "@/hooks/useHandleShoppingGuide";

import QuoteComponent from "../UberComponents/QuoteComponent";

export default function HomeDelivery() {
    const {
        inputsHome,
        typeLocation,
        closerStore,
        changeWithinLimitSaved,
        handleInputsAddress,
        handleDistanceSaved,
        handleInputsHome,
        handleTypeLocation,
        handleCloserStore,
        changeInpusHome
    } = useHandlePlace({});
    const { nextStepGuide } = useHandleShoppingGuide();

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

                <PlaceFinder
                    changeWithinLimitSaved={changeWithinLimitSaved}
                    withinLimitSaved={inputsHome.withinLimitSaved}
                    handleInputsAddress={handleInputsAddress}
                    inputAddress={inputsHome.inputAddress}
                    distanceSaved={inputsHome.distanceSaved}
                    inputsHome={inputsHome}
                    closerStore={closerStore}
                    handleDistanceSaved={handleDistanceSaved}
                    handleCloserStore={handleCloserStore}
                    changeInpusHome={changeInpusHome}
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
