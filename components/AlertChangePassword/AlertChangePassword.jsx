import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState, useEffect } from "react";
import useGetAlertDialogMessage from "@/hooks/useGetAlertDialogMessage";
import { useRouter } from "next/navigation";

import { forgetPassword } from "@/services/userApi";

function AlertChangePassword({ params }) {
    const { alertDialogMessage, closeAlertDialogMessage } =
        useGetAlertDialogMessage({ type: "changePassword" });
    const [open, setOpen] = useState(
        alertDialogMessage ? alertDialogMessage.open : false
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setOpen(alertDialogMessage.open);
    }, [alertDialogMessage.open]);

    async function changePassword() {
        console.log("Cambiando contraseña...");
        setLoading(true);
        const response = await forgetPassword({ token: params });
        if (response.message) {
            setLoading(false);
            setError(response.message);
            return;
        }
        console.log("Contraseña cambiada exitosamente");
        setLoading(false);
        closeAlertDialogMessage();
        router.push("/menu");
    }

    return (
        <Dialog
            open={open}
            onClose={() => {
                closeAlertDialogMessage();
            }}
        >
            <DialogTitle>{"Alerta"}</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <DialogContentText>
                    {
                        "Si acepta, se borrará su contraseña actual y le enviaremos por email una contraseña temporal que podrá modificar al iniciar sesión."
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={changePassword}
                    disabled={loading}
                >
                    Enviar
                </Button>
                {error ? <p style={{ color: "red" }}>{error}</p> : <></>}
            </DialogActions>
        </Dialog>
    );
}

export default AlertChangePassword;
