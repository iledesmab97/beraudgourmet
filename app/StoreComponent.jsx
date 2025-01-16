"use client";
import React from "react";
import { Typography, Button, Box, keyframes } from "@mui/material";
import { useSelector } from "react-redux";
import { MapPin, PhoneIcon } from "lucide-react";
import useGetModal from "@/hooks/useGetModal";
import { useTheme } from "@mui/material/styles";
import ModalStoresDetail from "@/components/ModalStoresDetail/ModalStoresDetail";

export default function StoreComponent() {
    const theme = useTheme(); // Get the theme object
    const { closerStore } = useSelector((state) => state.place);
    const { handleOpenModal } = useGetModal({ modalType: "place" });

    const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 ${theme.palette.primary.main}70; // Use theme color with transparency
    }
    70% {
      box-shadow: 0 0 0 10px ${theme.palette.primary.main}00; // Transparent end state
    }
    100% {
      box-shadow: 0 0 0 0 ${theme.palette.primary.main}00; // Transparent end state
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
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`, // Use theme colors for gradient
                            color: theme.palette.common.white, // Use theme color for text
                            textAlign: "left",
                            transition: "all 0.3s ease-in-out",
                            animation: `${pulse} 2s infinite`,
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: `0 10px 20px rgba(0,0,0,0.2)`,
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
                                                ? theme.palette.success.light
                                                : theme.palette.error.light, // Use theme colors for background
                                            color: closerStore.open
                                                ? theme.palette.success.main
                                                : theme.palette.error
                                                      .contrastText, // Use theme colors for text
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
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: theme.palette.primary
                                            .contrastText, // Use theme color for text
                                        fontWeight: "bold",
                                        border: `1px solid ${theme.palette.primary.main}`, // Use theme color for border
                                        padding: "4px 8px",
                                        borderRadius: "8px",
                                        backgroundColor:
                                            theme.palette.primary.light, // Use theme color for background
                                        maxWidth: "fit-content",
                                        mt: 1,
                                        fontSize: "22px",
                                    }}
                                >
                                    {""}
                                    <PhoneIcon />
                                    <Typography
                                        variant=""
                                        component="span"
                                        sx={{ ml: 1 }}
                                    >
                                        {closerStore.phone}
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Button>
                    <ModalStoresDetail />
                </Box>
            ) : (
                null
                // <Box
                //     sx={{
                //         display: "flex",
                //         flexDirection: "column",
                //         alignItems: "center",
                //         justifyContent: "center",
                //         my: 4,
                //         mx: 2,
                //     }}
                // >
                //     <MapPin size={32} color="gray" />

                //     <Typography
                //         variant="body1"
                //         align="center"
                //         sx={{ mt: 2, color: "text.primary" }}
                //     >
                //         Algunas funciones del sitio web necesitan permisos de
                //         localización. Por favor, habilita la localización en la
                //         configuración de tu navegador.
                //     </Typography>
                // </Box>
            )}
        </>
    );
}
