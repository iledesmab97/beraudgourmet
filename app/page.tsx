"use client";
import React from "react";
import {
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";
import { Restaurant, EventAvailable } from "@mui/icons-material";
import Link from "next/link";
import StoreComponent from "./StoreComponent";
import ServiciosEstaticos from "./Servicios";

const ServiceCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
}));

export default function Home() {
    return (
        <>
            <StoreComponent />
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
                                    xs: "2rem",
                                    sm: "3rem",
                                    md: "4rem",
                                    lg: "5rem",
                                    xl: "6rem",
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
                <ServiciosEstaticos />
            </Box>
        </>
    );
}
