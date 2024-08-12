import { useState, useMemo } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
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
    const sw = new google.maps.LatLng(19.0, -99.4);
    const ne = new google.maps.LatLng(19.8, -98.8);

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
            bounds: bounds,
            componentRestrictions: {
                country: "MX",
            },
        },
    });

    const { debounceSetValue } = useDebounce();

    function handleSetAddress(value) {
        localStorage.setItem("dropoff_address", value);
        setAddress(value);
    }

    function handleInputChange(event) {
        if (!event) return;
        debounceSetValue(() => setValue(event.target.value), 500);
        handleSetAddress(event.target.value);
    }

    function handleSelect(event, value, reason) {
        const suggestion = event.target.textContent;
        setSelectedSuggestion(value);
        handleSetAddress(suggestion);
        setValue(suggestion, false); // false para no borrar el valor del campo
        clearSuggestions();
        calculateRoute(suggestion);
    }

    async function calculateRoute(address) {
        if (!address) return setDistance(null);
        const directionService = new google.maps.DirectionsService();
        let newDistance = Infinity;
        let closerStore;

        for (const store of stores) {
            const { coordinates } = store;
            const results = await directionService.route({
                origin: { lat: coordinates.lat, lng: coordinates.lng },
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
        }
        setDistance(newDistance);
        setStoreMoreClose(closerStore);
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
    };
}
