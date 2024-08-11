"use client";

import useGetModal from "@/hooks/useGetModal";
import FormModalDeliveryPlace from "./FormModalDeliveryPlace";
import PlaceFinder from "../PlaceFinder/PlaceFinder";
import useHandlePlace from "@/hooks/useHandlePlace";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import QuoteComponent from "../UberComponents/QuoteComponent";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
};

export default function ModalDeliveryPlace() {
    const { open, handleCloseModal } = useGetModal({
        modalType: "deliveryPlace",
    });
    const {
        closerStore,
        inputsHome,
        typeLocation,
        changeWithinLimitSaved,
        handleInputsAddress,
        handleDistanceSaved,
        handleCloserStore,
        handleInputsHome,
        handleTypeLocation,
    } = useHandlePlace();

    return (
        <Modal
            open={open}
            onClose={() => {
                handleCloseModal("deliveryPlace");
            }}
        >
            <Box sx={style}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 2,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="title"
                        component="h2"
                        align="center"
                        sx={{
                            mb: 5,
                        }}
                    >
                        Dirección de entrega
                    </Typography>

                    <PlaceFinder
                        withinLimitSaved={inputsHome.withinLimitSaved}
                        inputAddress={inputsHome.inputAddress}
                        distanceSaved={inputsHome.distanceSaved}
                        closerStore={closerStore}
                        changeWithinLimitSaved={changeWithinLimitSaved}
                        handleInputsAddress={handleInputsAddress}
                        handleDistanceSaved={handleDistanceSaved}
                        handleCloserStore={handleCloserStore}
                    />

                    {inputsHome.withinLimitSaved ? (
                        <>
                            <QuoteComponent closerStore={closerStore} />
                            <FormModalDeliveryPlace
                                inputsHome={inputsHome}
                                typeLocation={typeLocation}
                                closerStore={closerStore}
                                handleInputsHome={handleInputsHome}
                                handleTypeLocation={handleTypeLocation}
                                currentModal="deliveryPlace"
                            />
                        </>
                    ) : null}
                </Box>
            </Box>
        </Modal>
    );
}
