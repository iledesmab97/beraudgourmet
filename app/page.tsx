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
    keyframes,
    Paper,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import { Restaurant, EventAvailable } from "@mui/icons-material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MapPin, PhoneIcon } from "lucide-react";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ModalStoresDetail from "@/components/ModalStoresDetail/ModalStoresDetail";
import useGetModal from "@/hooks/useGetModal";

const IconWrapper = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
    width: 60,
    height: 60,
    justifyContent: "center",
}));

const LabelWrapper = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
    fontWeight: 500,
}));

const items = [
    { icon: LocalShippingIcon, label: "Delivery" },
    { icon: EventIcon, label: "Eventos" },
    { icon: TakeoutDiningIcon, label: "BoxLunch" },
    { icon: CoffeeIcon, label: "CoffeeBreak" },
    { icon: FavoriteIcon, label: "Bodas" },
    { icon: RoomServiceIcon, label: "Meseros" },
];

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
    const { closerStore } = useSelector((state: any) => state.place);
    const { handleOpenModal } = useGetModal({ modalType: "place" });
    const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(41, 83, 134, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(41, 83, 134, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(41, 83, 134, 0);
    }
  `;

    const float = keyframes`
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
`;
    return (
        <>
            {closerStore ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 4,
                        mx: 2,
                    }}
                >
                    <Button
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            height: "auto",
                            borderRadius: 4,
                            padding: 3,
                            background:
                                "linear-gradient(45deg, #295386 30%, #4e5762 90%)",
                            color: "white",
                            textAlign: "left",
                            transition: "all 0.3s ease-in-out",
                            animation: `${pulse} 2s infinite`,
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                            },
                        }}
                        onClick={() => handleOpenModal("storesDetail")}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                sx={{
                                    mr: 2,
                                    animation: `${float} 3s ease-in-out infinite`,
                                }}
                            >
                                <MapPin size={32} />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    Visítanos
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ opacity: 0.9 }}
                                >
                                    Tienda más cercana: {closerStore.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        mt: 2,
                                        opacity: 0.7,
                                    }}
                                >
                                    Actualmente se encuentra:{" "}
                                    <span
                                        style={{
                                            backgroundColor: closerStore.open
                                                ? "#d4edda"
                                                : "#f8d7da", // Light green if open, light red if closed
                                            color: closerStore.open
                                                ? "#155724"
                                                : "#721c24", // Darker green text if open, dark red text if closed
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        {closerStore.open
                                            ? "Abierto"
                                            : "Cerrado"}
                                    </span>
                                </Typography>
                                <Typography
                                    variant="h6" // Slightly larger text for emphasis
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#1976d2", // Use a modern, blue color for the text
                                        fontWeight: "bold", // Make the text bold
                                        border: "1px solid #1976d2", // Add a subtle border for emphasis
                                        padding: "4px 8px", // Add padding for spacing
                                        borderRadius: "8px", // Rounded corners for a modern look
                                        backgroundColor: "#e3f2fd", // Light blue background for a modern feel
                                        maxWidth: "fit-content", // Adjust width to fit content
                                        mt: 1, // Add some margin-top for spacing
                                    }}
                                >
                                    <PhoneIcon />{" "}
                                    {/* Phone icon with a right margin for spacing */}
                                    {closerStore.phone}
                                </Typography>
                            </Box>
                        </Box>
                    </Button>
                    <ModalStoresDetail />
                </Box>
            ) : (
                <></>
            )}
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

                <Box
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        bgcolor: "grey.100",
                        borderRadius: 2,
                    }}
                >
                    <Grid container spacing={3} justifyContent="center">
                        {items.map(({ icon: Icon, label }) => (
                            <Grid item key={label}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <IconWrapper elevation={2}>
                                        <Icon color="primary" />
                                    </IconWrapper>
                                    <LabelWrapper
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {label}
                                    </LabelWrapper>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
