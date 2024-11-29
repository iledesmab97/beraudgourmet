import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import SelectDateTime from "./SelectDateTime";
import PlaceFinder from "@/components/PlaceFinder/PlaceFinder";
import FormModalDeliveryPlace from "@/components/ModalDeliveryPlace/FormModalDeliveryPlace";

import useHandlePlace from "@/hooks/useHandlePlace";
import { useState, useEffect } from "react";
import QuoteComponent from "../UberComponents/QuoteComponent";

function SelectExtraData({ extraData, updateExtraData }) {
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
    } = useHandlePlace({});

    useEffect(() => {
        const newExtraData = {
            ...extraData,
            inputsHome,
        };
        updateExtraData(newExtraData);
    }, [inputsHome]);

    function handleChangeDates(date, value) {
        const newExtraDates = {
            ...extraData,
            [date]: value,
        };
        updateExtraData(newExtraDates);
    }

    function handleChangeChecked(event) {
        const newExtraData = {
            ...extraData,
            delivery: event.target.checked,
        };
        updateExtraData(newExtraData);
    }

    function handleChangePaymentMethod(event) {
        const newExtraData = {
            ...extraData,
            paymentMethod: event.target.value,
        };
        updateExtraData(newExtraData);
    }

    return (
        <Grid item container spacing={2} alignItems={"center"}>
            <Grid item>
                <Typography variant="title">Datos Extra</Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs>
                    <SelectDateTime
                        label={"Fecha de emición *"}
                        value={
                            extraData.applicationDate
                                ? extraData.applicationDate
                                : null
                        }
                        onChange={(newDate) => {
                            handleChangeDates("applicationDate", newDate);
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <SelectDateTime
                        label={"Fecha de entrega *"}
                        value={
                            extraData.deliveryDate
                                ? extraData.deliveryDate
                                : null
                        }
                        onChange={(newDate) => {
                            handleChangeDates("deliveryDate", newDate);
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item sx={{ ml: 2 }}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={extraData.delivery ? true : false}
                                onChange={handleChangeChecked}
                            />
                        }
                        label={
                            extraData.delivery
                                ? "Delivery"
                                : "Recoger en tienda"
                        }
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={8} sm={5} md={4}>
                <FormControl fullWidth>
                    <InputLabel>Método de Pago *</InputLabel>
                    <Select
                        value={
                            extraData.paymentMethod
                                ? extraData.paymentMethod
                                : ""
                        }
                        label="Método de Pago *"
                        onChange={handleChangePaymentMethod}
                    >
                        <MenuItem value={"transfer"}>
                            {"Transferencia"}
                        </MenuItem>
                        <MenuItem value={"cash"}>{"Efectivo"}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {extraData.delivery ? (
                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="title">
                            Dirección de entrega
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    {inputsHome.withinLimitSaved ? (
                        <>
                            <QuoteComponent closerStore={closerStore} />
                            <Grid item>
                                <FormModalDeliveryPlace
                                    inputsHome={inputsHome}
                                    typeLocation={typeLocation}
                                    closerStore={closerStore}
                                    handleInputsHome={handleInputsHome}
                                    handleTypeLocation={handleTypeLocation}
                                    currentModal="deliveryPlace"
                                    outModal={true}
                                />
                            </Grid>
                        </>
                    ) : null}
                </Grid>
            ) : null}
        </Grid>
    );
}

export default SelectExtraData;
