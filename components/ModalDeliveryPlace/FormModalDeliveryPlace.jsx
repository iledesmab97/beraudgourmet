"use client";

import useGetPlace from "@/hooks/useGetPlace";
import useGetModal from "@/hooks/useGetModal";
import places from "@/typePlaces.json";
import QuoteComponent from "@/components/UberComponents/QuoteComponent";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextArea from "../TextArea/TextArea";
import { useEffect } from "react";

export default function FormModalDeliveryPlace({
    inputsHome,
    handleInputsHome,
    typeLocation,
    handleTypeLocation,
    closerStore,
    currentModal,
    outModal,
    nextStep,
}) {
    const { handleCloseModal } = useGetModal({ modalType: "place" });
    const { handleAddPlace, handleTypeDelivery } = useGetPlace();

    return (
        <>
            <Grid container spacing={2}>
                <Grid
                    item
                    sm={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="p"
                        component="h2"
                        align="right"
                        md={3}
                        sx={{
                            pr: 3,
                        }}
                    >
                        Tipo:
                    </Typography>
                </Grid>
                <Grid item sm={9}>
                    <FormControl fullWidth>
                        <InputLabel id="type-place-label">
                            Tipo de residencia
                        </InputLabel>
                        <Select
                            labelId="type-place"
                            id="type-place-select"
                            value={typeLocation.name}
                            label="Tipo de residencia"
                            onChange={handleTypeLocation}
                        >
                            <MenuItem value="home">
                                Casa: Dirección residencial
                            </MenuItem>
                            <MenuItem value="work">
                                Trabajo: Dirección comercial
                            </MenuItem>
                            <MenuItem value="building">
                                Casa: Departament
                            </MenuItem>
                            <MenuItem value="other">Hotel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {inputsHome.other && Object.keys(inputsHome.other).length ? (
                    <>
                        <Grid
                            item
                            sm={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="p"
                                component="h2"
                                align="right"
                                sx={{
                                    pr: 3,
                                }}
                            >
                                {places[inputsHome.type.name].other.name}:
                            </Typography>
                        </Grid>

                        {Object.keys(inputsHome.other).length && (
                            <Grid item container sm={9} spacing={1}>
                                {Object.keys(inputsHome.other).map(
                                    (input, index) => (
                                        <Grid
                                            key={`${input}/${index}`}
                                            item
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    sm: `${
                                                        places[
                                                            inputsHome.type.name
                                                        ].other.inputs[index]
                                                            .width
                                                    }%`,
                                                },
                                            }}
                                        >
                                            <TextField
                                                id="input-unidad"
                                                variant="outlined"
                                                placeholder={
                                                    places[inputsHome.type.name]
                                                        .other.inputs[index]
                                                        .nameES
                                                }
                                                key={input + index}
                                                name={input}
                                                value={inputsHome.other[input]}
                                                onChange={handleInputsHome}
                                                fullWidth
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        )}
                    </>
                ) : null}

                <Grid
                    item
                    sm={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="p"
                        component="h2"
                        align="right"
                        sx={{
                            pr: 3,
                        }}
                    >
                        Calle:
                    </Typography>
                </Grid>

                <Grid container item sm={9} spacing={1}>
                    {Object.keys(inputsHome.street).map((input, index) => (
                        <Grid
                            key={`${input}:${index}`}
                            item
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: `${
                                        places[inputsHome.type.name].street[
                                            index
                                        ].width
                                    }%`,
                                },
                            }}
                        >
                            <TextField
                                id="input-unidad"
                                variant="outlined"
                                placeholder={
                                    places[inputsHome.type.name].street[index]
                                        .nameES
                                }
                                name={input}
                                onChange={handleInputsHome}
                                value={inputsHome.street[input]}
                                fullWidth
                                key={input + index}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Grid
                    item
                    sm={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="p"
                        component="h2"
                        align="right"
                        sx={{
                            pr: 3,
                        }}
                    >
                        Pueblo/Ciudad:
                    </Typography>
                </Grid>

                <Grid container item sm={9} spacing={1}>
                    <Grid
                        item
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "70%",
                            },
                        }}
                    >
                        <TextField
                            id="input-unidad"
                            variant="outlined"
                            placeholder={typeLocation.city.city}
                            name="city"
                            onChange={handleInputsHome}
                            value={inputsHome.city}
                            fullWidth
                        />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "30%",
                            },
                        }}
                    >
                        <TextField
                            id="input-unidad"
                            variant="outlined"
                            placeholder={typeLocation.city.postal}
                            name="postalCode"
                            onChange={handleInputsHome}
                            value={inputsHome.postalCode}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid
                    item
                    sm={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Typography
                        id="title-note-formModalDeliveryPlace"
                        variant="p"
                        component="h2"
                        align="right"
                        sx={{
                            pr: 3,
                        }}
                    >
                        Nota:
                    </Typography>
                </Grid>

                <Grid item sm={9} xs={12}>
                    <TextArea
                        minRows={3}
                        maxRows={3}
                        aria-label="minimum height"
                        onChange={handleInputsHome}
                        value={inputsHome.note}
                        name="note"
                    />
                </Grid>

                {!outModal ? (
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleAddPlace({ inputsHome, closerStore });
                            handleTypeDelivery({
                                name: "home",
                                totalName: "Entrega a domicilio",
                            });
                            handleCloseModal("place");
                            nextStep("store");
                        }}
                        sx={{
                            position: "fixed",
                            bottom: 16,
                            right: 40,
                            alignSelf: "flex-end",
                            mt: 2,
                        }}
                    >
                        Agregar
                    </Button>
                ) : null}
            </Grid>
        </>
    );
}
