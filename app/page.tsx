"use client";
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Restaurant, EventAvailable } from "@mui/icons-material";
import Link from "next/link";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation";
import { delay } from "@/utils/wait";

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
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            fontFamily: "Playfair Display, serif",
        },
        h2: {
            fontFamily: "Playfair Display, serif",
        },
        h5: {
            fontFamily: "Playfair Display, serif",
        },
    },
});

const ElegantButton = styled(Button)(({ theme: any }) => ({
    borderRadius: 0,
    padding: theme.spacing(1, 4),
    transition: "background-color 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
    },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[4],
    },
}));

export default function Home() {
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            color="primary"
                            sx={{
                                fontSize: {
                                    xs: "2rem", // font size for extra-small screens
                                    sm: "3rem", // font size for small screens
                                    md: "4rem", // font size for medium screens
                                    lg: "5rem", // font size for large screens
                                    xl: "6rem", // font size for extra-large screens
                                },
                                textAlign: "center",
                            }}
                        >
                            Bienvenido a Béraud
                        </Typography>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            color="secondary"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1.25rem",
                                    md: "1.5rem",
                                    lg: "2rem",
                                    xl: "2.5rem",
                                },
                                textAlign: "center",
                            }}
                        >
                            Experiencia culinaria francesa a su servicio
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <ServiceCard>
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 140,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        bgcolor: "primary.main",
                                        color: "white",
                                    }}
                                >
                                    <Restaurant sx={{ fontSize: 60 }} />
                                </CardMedia>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        color="primary"
                                    >
                                        Menús de Comida
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Descubra nuestra selección de menús
                                        inspirados en la cocina francesa,
                                        preparados con ingredientes frescos y de
                                        alta calidad.
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Link href="/pizzas">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Ver Menús
                                            </Button>
                                        </Link>
                                    </Box>
                                </CardContent>
                            </ServiceCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ServiceCard>
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 140,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        bgcolor: "primary.main",
                                        color: "white",
                                    }}
                                >
                                    <EventAvailable sx={{ fontSize: 60 }} />
                                </CardMedia>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        color="primary"
                                    >
                                        Eventos
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Haga de su evento una experiencia
                                        inolvidable con nuestros servicios de
                                        catering y organización de eventos a
                                        medida.
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Link href="/about">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Más sobre Eventos
                                            </Button>
                                        </Link>
                                    </Box>
                                </CardContent>
                            </ServiceCard>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
