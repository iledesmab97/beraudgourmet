"use client";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useEffect } from "react";
import useGetAlertMessage from "@/hooks/useGetAlertMessage";
import useDebounce from "@/hooks/useDebounce";

import styles from "./AlertMessage.module.css";

const iconsStatus = {
    success: <CheckCircleOutlineIcon />,
    error: <ErrorOutlineIcon />,
};

function AlertMessage() {
    const { alertMessage, handleCloseAlertMessage } = useGetAlertMessage();
    const { debounceSetValue } = useDebounce();

    useEffect(() => {
        if (!alertMessage.checked) return;
        debounceSetValue(() => {
            handleCloseAlertMessage();
        }, 5000);
    }, [alertMessage.checked]);

    return (
        <Box className={styles.containerAlertMessage}>
            <Collapse
                in={alertMessage.checked}
                orientation="horizontal"
                className={styles.containerCollapse}
            >
                <Alert
                    icon={
                        alertMessage.status
                            ? iconsStatus[alertMessage.status]
                            : null
                    }
                    severity={alertMessage.status}
                    onClose={handleCloseAlertMessage}
                    variant="filled"
                    sx={{
                        width: "400px",
                    }}
                    className={styles.containerAlert}
                >
                    <AlertTitle>
                        <Typography variant="title" sx={{ color: "white" }}>
                            {alertMessage.status
                                ? alertMessage.status[0].toUpperCase() +
                                  alertMessage.status.slice(1).toLowerCase()
                                : ""}
                        </Typography>
                    </AlertTitle>
                    {alertMessage.text}
                </Alert>
            </Collapse>
        </Box>
    );
}

export default AlertMessage;
