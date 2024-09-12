"use client";

import { createTheme } from "@mui/material/styles";
import { Typography, Container, Paper } from "@mui/material";
import { Construction } from "@mui/icons-material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#295386",
        },
        secondary: {
            main: "#4e5762",
        },
        background: {
            default: "#FFFFFF",
        },
    },
});

export default function MaintenanceComponent() {
    return (
        <Container sx={{ mt: 8, mb: 2 }} maxWidth="md">
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Construction
                    sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
                />
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    color="primary.main"
                    sx={{
                        fontSize: {
                            xs: "1.8rem",
                            sm: "2rem",
                            md: "2.5rem",
                            lg: "3rem",
                        }, // Responsive font size
                    }}
                >
                    En Mantenimiento
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    color="secondary.main"
                    sx={{
                        fontSize: {
                            sm: "1.5rem",
                            md: "2rem",
                            lg: "2.5rem",
                        }, // Responsive font size
                    }}
                >
                    Estamos trabajando en la Página para mejorar algunos
                    servicios.
                </Typography>
                <Typography variant="body1" paragraph align="center">
                    ¡Hola! Disculpe las molestias, la mayoría de nuestros
                    servicios estan deshabilitados en nuestro sitio web.
                </Typography>
                <Typography variant="body1" paragraph align="center">
                    Gracias por su paciencia y comprensión. ¡Volveremos pronto
                    con emocionantes mejoras!
                </Typography>
            </Paper>
        </Container>
    );
}
