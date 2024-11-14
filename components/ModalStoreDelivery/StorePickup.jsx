"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import ItemPlace from "../PlaceFinder/ItemPlace";

import { useDispatch, useSelector } from "react-redux";
import useGetPlace from "@/hooks/useGetPlace";
import useLocalData from "@/hooks/useLocalData";

import { makePlace } from "@/stores/place/slice";
import { useEffect, useState } from "react";

export default function StorePickup({
    handleCloseModal,
    nextStep,
}) {
    const { handleTypeDelivery } = useGetPlace();
    const { saveLocalData } = useLocalData();
    const dispatch = useDispatch()
    const { stores } = useSelector((state) => state.storeList);
    const [cityList, setCityList] = useState(getCityList(stores))
    const [citySelected, setCitySelected] = useState(null)

    // Update cityList
    useEffect(() => {
        if (cityList.length) return
        setCityList(getCityList(stores))
    }, [stores])

    function getCityList(stores) {
        const cityList = []
        if (stores) {
            stores.forEach((store) => {
                if (!cityList.includes(store.city)) {
                    cityList.push(store.city)
                }
            })
        }
        return cityList
    }

    function handleChange(_, newValue) {
        setCitySelected(newValue)
    }

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Typography
                    id="modal-subtitle-BUSCAR"
                    variant="title"
                    sx={{
                        alignSelf: "flex-start",
                    }}
                >
                    BUSCAR
                </Typography>

                <Autocomplete
                    value={citySelected}
                    disablePortal
                    id="autocomplete-StorePickup"
                    size="small"
                    fullWidth
                    options={cityList}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <ItemPlace {...props} place={option} key={option} />
                    )}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id="location"
                            label="Escriba su pueblo o ciudad"
                            type="text"
                            size="small"
                            margin="dense"
                            fullWidth
                        />
                    )}
                />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: {
                        xs: "auto",
                        sm: 360,
                    },
                }}
            >
                <Typography
                    id="modal-subtitle-cityName"
                    variant="title"
                    sx={{
                        alignSelf: "flex-start",
                    }}
                >
                    {citySelected ? citySelected.toUpperCase() : "TIENDAS"}
                </Typography>
                <List
                    sx={{
                        width: "100%",
                        height: {
                            xs: "auto",
                            sm: "90%",
                        },
                        p: "0px",
                        position: "static",
                        overflow: {
                            xs: "hidden",
                            sm: "auto",
                        },
                    }}
                >
                    {stores.filter((store) => {
                        if (citySelected) {
                            return store.city === citySelected
                        }
                        return true
                    }).map((store, index) => (
                        <ListItem
                            key={store.name + index}
                            alignItems="flex-start"
                            sx={{
                                borderTop: 1,
                                borderColor: "divider",
                                p: 0,
                                py: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: {
                                            xs: "100%",
                                            sm: "65%",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: "28px",
                                        }}
                                    >
                                        <PlaceIcon />
                                    </ListItemIcon>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        <Typography variant="title">
                                            {store.name}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            component="p"
                                            sx={{
                                                px: 0,
                                            }}
                                        >
                                            {store.place}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <LocalPhoneIcon />
                                            <Typography variant="p">
                                                {store.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Grid
                                    container
                                    direction={{
                                        xs: "column",
                                    }}
                                    justifyContent={"space-between"}
                                    alignItems={"flex-end"}
                                    spacing={{
                                        xs: 1,
                                    }}
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "fit-content",
                                        },
                                        mr: 1,
                                    }}
                                >
                                    <Grid
                                        item
                                        container
                                        direction={{
                                            xs: "row",
                                            sm: "column",
                                        }}
                                        alignItems={{
                                            xs: "center",
                                            sm: "flex-end",
                                        }}
                                        justifyContent={{
                                            xs: "flex-end",
                                            sm: "flex-start",
                                        }}
                                        spacing={{
                                            xs: 1,
                                            sm: 0,
                                        }}
                                    >
                                        <Grid item>
                                            <Typography variant="title">
                                                {store.open
                                                    ? `Cerramos a las:`
                                                    : `Abrimos a las:`}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="title">
                                                {store.open
                                                    ? store.closeTime
                                                    : store.openTime}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => {
                                                dispatch(makePlace({
                                                    closerStore: store
                                                }))
                                                saveLocalData("place", {
                                                    closerStore: store.id,
                                                });
                                                handleTypeDelivery({
                                                    name: "store",
                                                    totalName:
                                                        "Recoger en tienda",
                                                });
                                                handleCloseModal("place");
                                                nextStep("store");
                                            }}
                                        >
                                            Recoger en esta tienda
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
}
