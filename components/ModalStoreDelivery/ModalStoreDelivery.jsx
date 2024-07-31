"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

import StorePickup from "./StorePickup";
import HomeDelivery from "./HomeDelivery";
import MoveDown from "@/components/MoveDown/MoveDown";

import { useState } from "react";
import useGetModal from "@/hooks/useGetModal";
import useHandlePlace from "@/hooks/useHandlePlace";
import useGetStoreList from "@/hooks/useGetStoreList";
import useHandleShoppingGuide from "@/hooks/useHandleShoppingGuide";
import { useSelector } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "324px",
        sm: "700px",
        md: "700px",
    },
    height: {
        xs: "80%",
        sm: "60%",
        md: "700px",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 5,
    },
};

export default function ModalStoreDelivery() {
    const { open, handleCloseModal } = useGetModal({ modalType: "place" });

    const [delivery, setDelivery] = useState("store");
    const { nextStepGuide } = useHandleShoppingGuide();

    const {
        inputsStore,
        inputsHome,
        typeLocation,
        closerStore,
        changeWithinLimitSaved,
        handleInputsStore,
        handleInputsAddress,
        handleDistanceSaved,
        handleInputsHome,
        handleTypeLocation,
        handleCloserStore,
    } = useHandlePlace();

    const { stores, status, error } = useSelector((state) => state.storeList);

    function handlePlace(place) {
        setDelivery(place);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    handleCloseModal("place");
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        id="modal-container-storeDelivery"
                        sx={{
                            height: "100%",
                            pr: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 2,
                            overflowY: {
                                xs: "auto",
                                sm: "hidden",
                            },
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
                            {delivery === "store"
                                ? "Encuentre su tienda más cercana"
                                : "Indique el lugar de entrega"}
                        </Typography>

                        <ButtonGroup
                            size="large"
                            variant="contained"
                            aria-label="contained large button group"
                            sx={{
                                mb: 3,
                            }}
                        >
                            <Button
                                onClick={() => handlePlace("store")}
                                sx={
                                    delivery === "store"
                                        ? {
                                              backgroundColor:
                                                  "rgb(28, 58, 93)",
                                          }
                                        : {}
                                }
                            >
                                Recoger en la tienda
                            </Button>
                            <Button
                                onClick={() => handlePlace("home")}
                                sx={
                                    delivery === "home"
                                        ? {
                                              backgroundColor:
                                                  "rgb(28, 58, 93)",
                                          }
                                        : {}
                                }
                            >
                                Entrega a domicilio
                            </Button>
                        </ButtonGroup>
                        {delivery === "store" ? (
                            <StorePickup
                                storeList={stores}
                                inputsStore={inputsStore}
                                handleInputsStore={handleInputsStore}
                                handleCloseModal={handleCloseModal}
                                nextStep={nextStepGuide}
                            />
                        ) : (
                            <HomeDelivery
                                handleInputsAddress={handleInputsAddress}
                                inputsHome={inputsHome}
                                typeLocation={typeLocation}
                                withinLimitSaved={inputsHome.withinLimitSaved}
                                distanceSaved={inputsHome.distanceSaved}
                                closerStore={closerStore}
                                changeWithinLimitSaved={changeWithinLimitSaved}
                                handleDistanceSaved={handleDistanceSaved}
                                handleInputsHome={handleInputsHome}
                                handleTypeLocation={handleTypeLocation}
                                handleCloserStore={handleCloserStore}
                                nextStep={nextStepGuide}
                            />
                        )}
                        <MoveDown
                            sectionToGo={
                                delivery === "store"
                                    ? "#modal-subtitle-cityName"
                                    : "#title-note-formModalDeliveryPlace"
                            }
                            containerId={
                                delivery === "store"
                                    ? "#modal-container-storeDelivery"
                                    : "#HomeDelivery-container"
                            }
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
