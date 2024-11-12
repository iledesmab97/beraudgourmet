// app/components/ClientWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreListThunk } from "@/stores/actions/stores";
import { useLoadScript } from "@react-google-maps/api";
import useGetPlace from "@/hooks/useGetPlace";
import MaintenanceComponent from "@/components/Maintenance/MaintenanceComponent";
import StoreComponent from "./StoreComponent";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation";
import ServiciosEstaticos from "./Servicios";
import { Box } from "@mui/material";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

export default function ClientWrapper({ children }) {
    const [isMaintenance, setIsMaintenance] = useState(false); // State to manage maintenance mode
    const { handleAddPlace } = useGetPlace();
    const dispatch = useDispatch();
    const { stores, status, error } = useSelector((state) => state.storeList);
    const [locationPermission, setLocationPermission] = useState(null);
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);

    useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
        libraries,
    });

    // const maintenanceRoutes = ["/menu"];
    const maintenanceRoutes = [];

    // Function to update maintenance state based on current path
    const checkMaintenanceRoute = () => {
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            setIsMaintenance(maintenanceRoutes.includes(currentPath));
        }
    };

    useEffect(() => {
        // Check initial path when component mounts
        checkMaintenanceRoute();

        // Function to handle route changes
        const handleRouteChange = () => {
            checkMaintenanceRoute();
        };

        // Observe changes in the browser history (router navigations)
        window.addEventListener("popstate", handleRouteChange);
        window.addEventListener("pushState", handleRouteChange);
        window.addEventListener("replaceState", handleRouteChange);

        // Observe changes in the document (DOM) when the URL changes
        const observer = new MutationObserver(() => {
            handleRouteChange();
        });

        // Observe the body or any container where changes can occur due to route changes
        observer.observe(document, { subtree: true, childList: true });

        // Cleanup function to remove listeners and disconnect the observer
        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("pushState", handleRouteChange);
            window.removeEventListener("replaceState", handleRouteChange);
            observer.disconnect();
        };
    }, []);

    const requestLocationPermission = async () => {
        if (loading) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationPermission("granted");
                    setPosition(position.coords);
                },
                (error) => {
                    console.error("Error al obtener ubicación:", error);

                    if (error.code === error.PERMISSION_DENIED) {
                        setLocationPermission("denied");
                    } else {
                        setLocationPermission("denied");
                    }
                }
            );
        } else {
            console.error("Geolocation no está soportado por este navegador.");
            setLocationPermission("denied");
        }
    };

    useEffect(() => {
        dispatch(fetchStoreListThunk());
    }, [dispatch]);

    useEffect(() => {
        if (status !== "succeeded") {
            if (sessionStorage.getItem("hasAnimated")) {
                setLoading(false);
            }
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
                try {
                    const results = await directionService.route({
                        origin: { lat: Number(coordinates.lat), lng: Number(coordinates.lng) },
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
                } catch(error) {
                    return alert(error.message)
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
                        unity: "",
                        number: "",
                        streetName: "",
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
            {isMaintenance ? (
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
                children
            )}
        </>
    );
}
