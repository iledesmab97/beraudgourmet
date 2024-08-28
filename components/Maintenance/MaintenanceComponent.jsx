"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, Container, Paper } from "@mui/material";
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
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
                    >
                        En Mantenimiento
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        color="secondary.main"
                    >
                        Estamos trabajando en la rama Béraud para mejorar aún
                        más las cosas
                    </Typography>
                    <Typography variant="body1" paragraph align="center">
                        ¡Hola! Disculpe las molestias, pero actualmente estamos
                        realizando algunas actualizaciones esenciales para
                        mejorar su experiencia. Nuestro equipo está trabajando
                        diligentemente para que todo vuelva a funcionar lo más
                        rápido posible.
                    </Typography>
                    <Typography variant="body1" paragraph align="center">
                        Gracias por su paciencia y comprensión. ¡Volveremos
                        pronto con emocionantes mejoras!
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
