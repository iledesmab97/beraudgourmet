"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import FormModalDeliveryPlace from "./FormModalDeliveryPlace";

import useGetModal from "@/hooks/useGetModal";
import useHandlePlace from "@/hooks/useHandlePlace";
import useHandleShoppingGuide from "@/hooks/useHandleShoppingGuide";

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
        inputsHome,
        typeLocation,
        handleInputsHome,
        handleTypeLocation,
    } = useHandlePlace();
    const { nextStepGuide } = useHandleShoppingGuide();

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

                    <TextField
                        value={inputsHome.inputAddress}
                        label={'Place'}
                        disabled={true}
                        sx={{
                            width: '100%',
                            mb: 3
                        }}
                    />

                    <FormModalDeliveryPlace
                        inputsHome={inputsHome}
                        typeLocation={typeLocation}
                        handleInputsHome={handleInputsHome}
                        handleTypeLocation={handleTypeLocation}
                        currentModal="deliveryPlace"
                        nextStep={nextStepGuide}
                    />
                </Box>
            </Box>
        </Modal>
    );
}
