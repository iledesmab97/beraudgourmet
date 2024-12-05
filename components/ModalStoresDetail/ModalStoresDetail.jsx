"use client";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ListStores from "./ListStores";
import DetailStore from "./DetailStore";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import useGetModal from "@/hooks/useGetModal";
import useGetPlace from "@/hooks/useGetPlace";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "324px",
        sm: "700px",
    },
    height: {
        xs: "80%",
        sm: "700px",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 5,
    },
    pb: 2,
    overflowY: {
        xs: "auto",
        sm: "hidden",
    },
};

function ModalStoresDetail() {
    const theme = useTheme();
    const { open, handleCloseModal } = useGetModal({
        modalType: "storesDetail",
    });
    const { inputsHome, closerStore } = useSelector(state => state.place)
    const { handleAddPlace } = useGetPlace();
    const [currentStore, setCurrentStore] = useState(closerStore)

    useEffect(() => {
        setCurrentStore(closerStore)
    }, [closerStore])

    function handleCurrentStoreDetail(newCurrentStore) {
        setCurrentStore(newCurrentStore)
    }

    if (!currentStore) return;

    return (
        <Modal
            open={open}
            onClose={() => {
                handleCloseModal("storesDetail");
            }}
        >
            <Grid
                sx={style}
                container
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                alignItems={{
                    sm: "flex-start",
                }}
            >
                <Grid
                    item
                    sm={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="title"
                        component="h2"
                        align="center"
                        sx={{
                            mb: 2,
                        }}
                    >
                        Elegir una tienda
                    </Typography>
                </Grid>
                <Grid
                    id={"ModalStoresDetail-container"}
                    item
                    sm={12}
                    container
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={1}
                    wrap="nowrap"
                    sx={{
                        height: "85%",
                        overflowY: {
                            xs: "auto",
                            sm: "hidden",
                        },
                    }}
                >
                    <ListStores
                        handleCurrentStoreDetail={handleCurrentStoreDetail}
                        place={closerStore}
                    />
                    <DetailStore currentStore={currentStore} />
                </Grid>
                <Grid
                    item
                    sx={{
                        position: "absolute",
                        bottom: "16px",
                        right: "40px",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={
                            (currentStore.open ? false : true) ||
                            Boolean(inputsHome)
                        }
                        onClick={() => {
                            handleAddPlace({ closerStore });
                            handleCloseModal("storesDetail");
                        }}
                    >
                        <Typography>Pedir a la tienda</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    );
}

export default ModalStoresDetail;
