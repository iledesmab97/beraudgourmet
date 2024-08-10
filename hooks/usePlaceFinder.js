import { useState, useMemo } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useDebounce from "./useDebounce";

export default function usePlaceFinder({
    inputAddress,
    distanceSaved,
    closerStore,
    stores,
}) {
    const [address, setAddress] = useState(() =>
        inputAddress ? inputAddress : ""
    );
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
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

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "MX" },
        },
    });

    const { debounceSetValue } = useDebounce();

    function handleSetAddress(value) {
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
        selectedSuggestion,
        distance,
        withinLimit,
        storeMoreClose,
        handleSetAddress,
        handleSelect,
        handleInputChange,
    };
}
