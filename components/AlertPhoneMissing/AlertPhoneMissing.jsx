import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputPhoneNumber from "../InputPhoneNumber/InputPhoneNumber";

import { useState, useEffect } from "react";
import useGetAlertDialogMessage from "@/hooks/useGetAlertDialogMessage";
import useGetUser from "@/hooks/useGetUser";

import { isPossiblePhoneNumber } from "libphonenumber-js";
import { updateMyAccount } from "@/services/userApi";

function validation(phone) {
    let errors = "";
    if (!phone) errors = "Este campo no puede estar vacío";
    else {
        const [code, place, number] = phone.split(" ");
        if (!code) errors = "Coloca el código del país";
        if (!place) errors = "Coloca tu número de telefono";
        if (place && !isPossiblePhoneNumber(phone))
            errors = "Número de teléfono inválido";
    }
    return errors;
}

function AlertPhoneMissing() {
    const { alertDialogMessage, closeAlertDialogMessage } =
        useGetAlertDialogMessage({ type: "phoneMissing" });
    const [open, setOpen] = useState(
        alertDialogMessage ? alertDialogMessage.open : false
    );
    const [phone, setPhone] = useState("+52");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, handleUpdateUser } = useGetUser();

    useEffect(() => {
        setOpen(alertDialogMessage.open);
    }, [alertDialogMessage.open]);

    function handleChangePhone(newPhone) {
        setPhone(newPhone);
        setErrors(validation(newPhone));
    }

    async function handleActionButton() {
        setLoading(true);
        if (validation(phone)) {
            setErrors(validation(phone));
            return setLoading(false);
        }
        const response = await updateMyAccount({
            property: "phoneNumber",
            value: phone,
        });
        if (response.message) {
            setLoading(false);
            return alert(response.message);
        }
        const newUser = {
            ...user,
            numberPhone: phone,
        };
        handleUpdateUser(newUser);
        setLoading(false);
        closeAlertDialogMessage();
    }

    return (
        <Dialog
            open={open}
            onClose={() => {
                closeAlertDialogMessage();
            }}
        >
            <DialogTitle>{"Alerta"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        "Para poder brindarte un servicio de cálidad necesitamos que nos indiques tu número telefónico"
                    }
                </DialogContentText>
                <InputPhoneNumber
                    numberPhone={phone}
                    handleChangeNumberPhone={handleChangePhone}
                    errorsNumberPhone={errors}
                    placeholder={"+52 55 5555 5555"}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleActionButton();
                    }}
                    disabled={loading}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertPhoneMissing;
