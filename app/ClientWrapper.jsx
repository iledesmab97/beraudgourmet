// app/components/ClientWrapper.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation"; // Ajusta la ruta según sea necesario
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreListThunk } from "@/stores/actions/stores";
import { useLoadScript } from "@react-google-maps/api";
import useGetPlace from "@/hooks/useGetPlace";
import MaintenanceComponent from "@/components/Maintenance/MaintenanceComponent";
import StoreComponent from "./StoreComponent";
import ServiciosEstaticos from "./Servicios";
import { Box } from "@mui/material";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const colors = {
    primary: "#295386",
    secondary: "#4e5762",
    default: "#FFFFFF",
};
// Crea un contexto para el tema
const LayoutContext = createContext();

// Hook personalizado para usar el contexto
export const useLayoutContext = () => {
    return useContext(LayoutContext);
};

const libraries = ["places"];

export default function ClientWrapper({ children }) {
    useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
        libraries,
    });
    const { handleAddPlace } = useGetPlace();
    const [locationPermission, setLocationPermission] = useState(null);
    const [position, setPosition] = useState(null);
    const [maintenance, setMaintenance] = useState(true);
    const dispatch = useDispatch();
    const { stores, status, error } = useSelector((state) => state.storeList);
    const [loading, setLoading] = useState(true);

    const requestLocationPermission = async () => {
        if (loading) return;
        // Solicitar permiso de ubicación mientras se muestra la animación
        if (navigator.geolocation) {
            try {
                const result = await navigator.permissions.query({
                    name: "geolocation",
                });

                if (result.state === "granted") {
                    setLocationPermission("granted");
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setLocationPermission("granted");
                            setPosition(position.coords);
                        },
                        (error) => {
                            console.error("Error al obtener ubicación:", error);
                            setLocationPermission("denied");
                        }
                    );
                } else {
                    setLocationPermission("denied");
                }
            } catch (error) {
                console.error(
                    "Error al solicitar permiso de ubicación:",
                    error
                );
                setLocationPermission("denied");
            }
        }
    };

    useEffect(() => {
        dispatch(fetchStoreListThunk());
    }, [dispatch]);

    useEffect(() => {
        if (status !== "succeeded")
            if (sessionStorage.getItem("hasAnimated")) {
                setLoading(false);
            }
        requestLocationPermission();
    }, [status, loading]);

    useEffect(() => {
        if (!position) return;
        async function calculateCloserRoute({
            lat,
            lng,
            stores: defaultStores,
        }) {
            const directionService = new google.maps.DirectionsService();
            const geocoder = new google.maps.Geocoder();
            let newDistance = Infinity;
            let closerStore;
            let delivery;

            for (const store of defaultStores) {
                const { coordinates } = store;
                const results = await directionService.route({
                    origin: { lat: coordinates.lat, lng: coordinates.lng },
                    destination: { lat: lat, lng: lng },
                    travelMode: "DRIVING",
                });
                let currentDistance =
                    results.routes[0].legs[0].distance.value / 1000;

                if (currentDistance < newDistance) {
                    newDistance = currentDistance;
                    closerStore = store;

                    if (currentDistance < 1) break;
                }
            }
            delivery = await geocoder.geocode({
                location: { lat: lat, lng: lng },
            });

            handleAddPlace({
                inputsHome: {
                    type: {
                        name: "home",
                    },
                    inputAddress: delivery.results[0].formatted_address,
                    street: {
                        unity: "", // Empty string initially
                        number: "", // Empty string initially
                        streetName: "", // Empty string initially
                    },
                },
                closerStore,
                typeDelivery: {
                    name: "home",
                    totalName: "Entrega a domicilio",
                },
            });
        }
        calculateCloserRoute({
            lat: position.latitude,
            lng: position.longitude,
            stores,
        });
    }, [position]);

    const handleAnimationComplete = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && !sessionStorage.getItem("hasAnimated") && (
                <CurtainAnimation
                    onComplete={handleAnimationComplete}
                    storesStatus={status}
                />
            )}
            {maintenance ? (
                <Box
                    sx={{
                        display: "flex",
                        bgcolor: "background.default",
                        flexDirection: "column",
                    }}
                >
                    <StoreComponent />
                    <MaintenanceComponent />
                    <ServiciosEstaticos />
                </Box>
            ) : (
                <LayoutContext.Provider value={""}>
                    {children}
                </LayoutContext.Provider>
            )}
        </>
    );
}
