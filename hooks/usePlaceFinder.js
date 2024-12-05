import { useState, useMemo } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useDebounce from "./useDebounce";

export default function usePlaceFinder({
    inputAddress,
    distanceSaved,
    closerStore,
    stores,
}) {
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [address, setAddress] = useState((prev) =>
        inputAddress ? inputAddress : ""
    );
    const [distance, setDistance] = useState(() =>
        distanceSaved ? distanceSaved : null
    );
    const withinLimit = useMemo(() => {
        if (!distance) return null;
        if (distance > 5) return false;
        if (distance <= 5) return true;
        return null;
    }, [distance]);
    const [storeMoreClose, setStoreMoreClose] = useState(closerStore);
    const sw = { lat: 19.392859721213277, lng: -99.28758348373333 };
    const ne = { lat: 19.487428244562256, lng: -99.11594403710876 };

    const bounds = new google.maps.LatLngBounds(sw, ne);
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            // Change for locationBias and locationRestriction refer to google maps API docs
            locationRestriction: bounds,
            componentRestrictions: {
                country: "MX",
            },
        },
    });

    const { debounceSetValue } = useDebounce();

    function handleSetAddress(value) {
        setAddress(value);
    }

    function handleInputChange(event) {
        if (!event) return;
        const { value } = event.target;
        handleSetAddress(value);
        if (value) {
            debounceSetValue(() => setValue(value), 500);
        }
    }

    function handleSelect(event, value, reason) {
        const description = value?.description ? value.description : "";
        setSelectedSuggestion(value);
        handleSetAddress(description);
        if (description) {
            setValue(description, false); // false para no borrar el valor del campo
            clearSuggestions();
            calculateRoute(description);
        }
    }

    async function calculateRoute(address) {
        if (!address) return setDistance(null);
        const directionService = new google.maps.DirectionsService();
        let newDistance = Infinity;
        let closerStore;

        for (const store of stores) {
            const { coordinates } = store;
            try {
                const results = await directionService.route({
                    origin: {
                        lat: Number(coordinates.lat),
                        lng: Number(coordinates.lng),
                    },
                    destination: address,
                    travelMode: "DRIVING",
                });

                let currentDistance =
                    results.routes[0].legs[0].distance.value / 1000;

                if (currentDistance < newDistance) {
                    newDistance = currentDistance;
                    closerStore = store;

                    if (currentDistance < 1) break;
                }
            } catch (error) {
                continue;
            }
        }
        if (!closerStore)
            return alert(
                "En este momento no estamos prestando el servicio de delivery a este lugar"
            );
        setDistance(newDistance);
        setStoreMoreClose(closerStore);
    }

    async function getTotalDataAddress(description) {
        const [totalDataSelectedSuggestion] = await getGeocode({
            address: description,
        });

        const { lat, lng } = getLatLng(totalDataSelectedSuggestion);
        const addressFormatted = getAddressFormatted(
            totalDataSelectedSuggestion.address_components
        );
        return {
            ...addressFormatted,
            coordinates: { lat, lng },
        };
    }

    function getAddressFormatted(addressComponents) {
        function findComponent(type) {
            const component = addressComponents.find((comp) =>
                comp.types.includes(type)
            );
            return component ? component.short_name : null;
        }

        const streetNumber = findComponent("street_number");
        const route = findComponent("route");
        const city =
            findComponent("locality") ||
            findComponent("administrative_area_level_2");
        const state = findComponent("administrative_area_level_1");
        const zipCode = findComponent("postal_code");
        const country = findComponent("country");

        return {
            streetNumber,
            route,
            city,
            state,
            zipCode,
            country,
        };
    }

    return {
        address,
        data,
        status,
        selectedSuggestion,
        distance,
        withinLimit,
        storeMoreClose,
        handleSetAddress,
        handleSelect,
        handleInputChange,
        getTotalDataAddress,
        ready,
    };
}
