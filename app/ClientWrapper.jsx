// app/components/ClientWrapper.tsx
"use client";

import MaintenanceComponent from "@/components/Maintenance/MaintenanceComponent";
import StoreComponent from "./StoreComponent";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation";
import { Box } from "@mui/material";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import useGoogleMaps from "@/hooks/useGoogleMaps";

import ServiciosEstaticos from "./Servicios";
import { getLocalData, saveLocalData  } from "@/utils/manageLocalStorage";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];

export default function ClientWrapper({ children }) {
    const [isMaintenance, setIsMaintenance] = useState(false); // State to manage maintenance mode
    const { status } = useSelector((state) => state.storeList);
    const [locationPermission, setLocationPermission] = useState(null);
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getTotalDataAddress } = useGoogleMaps()
    const params = useParams()

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
                    setLocationPermission("denied");
                }
            );
        } else {
            console.error("Geolocation no está soportado por este navegador.");
            setLocationPermission("denied");
        }
    };

    useEffect(() => {
        if (status !== "succeeded") {
            if (sessionStorage.getItem("hasAnimated")) {
                setLoading(false);
            }
        }
        if (!getLocalData("geolocation")) {
            requestLocationPermission();
        }
    }, [status, loading]);

    useEffect(() => {
        const geolocation = getLocalData('geolocation')
        if (!position || geolocation) return;
        getHomeDataDirection(position)
    }, [position]);

    const handleAnimationComplete = () => {
        setLoading(false);
    };

    async function getHomeDataDirection(position) {
        const { latitude: lat, longitude: lng } = position
        const totalDataAddress = await getTotalDataAddress({ location: {
            lat,
            lng
        }})
        const { totalAddress: inputAddress, streetNumber, route, city, state, zipCode, country, coordinates } = totalDataAddress
        const newInputHome = {
            inputAddress,
            type: {
                name: "home",
                totalName: "Casa: Dirección residencial"
            },
            city,
            postalCode: zipCode,
            street: {
                number: streetNumber,
                streetName: route
            },
            state,
            country,
            coordinates
        }

        saveLocalData("geolocation", { ... newInputHome });
    }

    return (
        <>
            {
                loading && !sessionStorage.getItem("hasAnimated") && (
                    <CurtainAnimation
                        onComplete={handleAnimationComplete}
                    />
                )
            }
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
