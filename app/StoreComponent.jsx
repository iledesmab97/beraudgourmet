"use client";
import React from "react";
import { Typography, Button, Box, keyframes } from "@mui/material";

import { useSelector } from "react-redux";
import { MapPin, PhoneIcon } from "lucide-react";
import useGetModal from "@/hooks/useGetModal";

import ModalStoresDetail from "@/components/ModalStoresDetail/ModalStoresDetail";

export default function StoreComponent() {
    const { closerStore } = useSelector((state) => state.place);
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column", // Apila los elementos verticalmente
                        alignItems: "center", // Centra el contenido horizontalmente
                        justifyContent: "center",
                        my: 4,
                        mx: 2,
                    }}
                >
                    <MapPin size={32} color="gray" />

                    <Typography
                        variant="body1" // Tamaño de texto estándar
                        align="center" // Alinea el texto al centro
                        sx={{ mt: 2, color: "text.primary" }} // Margen superior y color de texto primario
                    >
                        Algunas funciones del sitio web necesitan permisos de
                        localización. Por favor, habilita la localización en la
                        configuración de tu navegador.
                    </Typography>
                </Box>
            )}
        </>
    );
}
