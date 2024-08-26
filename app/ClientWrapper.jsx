// app/components/ClientWrapper.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CurtainAnimation } from "@/components/LoadingComponets/CurtainAnimation"; // Ajusta la ruta según sea necesario
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreListThunk } from "@/stores/actions/stores";
import { useLoadScript } from "@react-google-maps/api";
import useGetPlace from "@/hooks/useGetPlace";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Crea un contexto para el tema
const LayoutContext = createContext();

// Hook personalizado para usar el contexto
export const useLayoutContext = () => {
    return useContext(LayoutContext);
};

export default function ClientWrapper({ children }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
        libraries: ["places"],
    });
    const { handleAddPlace } = useGetPlace();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [locationPermission, setLocationPermission] = useState(null);
    const [position, setPosition] = useState(null);
    const dispatch = useDispatch();
    const { stores, status, error } = useSelector((state) => state.storeList);

    const requestLocationPermission = async () => {
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

    const handleButtonClick = () => {
        setLoading(!loading); // Cambia el estado de loading
        requestLocationPermission();
    };

    //Get Sotres first an then ask for location permissions

    useEffect(() => {
        dispatch(fetchStoreListThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoaded) return;

        requestLocationPermission();
    }, [isLoaded]);

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

    useEffect(() => {
        // Verifica si la animación ya se ejecutó para esta ruta
        const hasAnimated = sessionStorage.getItem(`hasAnimated_${pathname}`);

        if (!hasAnimated) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [pathname]);

    const handleAnimationComplete = () => {
        // Guardar en sessionStorage que la animación ya se ejecutó para esta ruta
        sessionStorage.setItem(`hasAnimated_${pathname}`, "true");
        setLoading(false);
    };

    return (
        <>
            {loading && (
                <CurtainAnimation
                    onComplete={handleAnimationComplete}
                    storesStatus={status}
                />
            )}
            {!loading && (
                <LayoutContext.Provider
                    value={{ loading, locationPermission, handleButtonClick }}
                >
                    {children}
                </LayoutContext.Provider>
            )}
            {/* Muestra un mensaje de estado del permiso de ubicación */}
            {locationPermission && <></>}
        </>
    );
}
