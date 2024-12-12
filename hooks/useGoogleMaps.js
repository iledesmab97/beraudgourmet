import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

export default function useGoogleMaps() {
    async function calculateRoute({ address, addressCoordinates, stores }) {
        if (!address && !addressCoordinates) return {};
        const directionService = new google.maps.DirectionsService();
        let newDistance = Infinity;
        let closerStore;

        for (const store of stores) {
            const { coordinates } = store;
            try {
                let results;
                if (address) {
                    results = await directionService.route({
                        origin: {
                            lat: Number(coordinates.lat),
                            lng: Number(coordinates.lng),
                        },
                        destination: address,
                        travelMode: "DRIVING",
                    });
                } else if (addressCoordinates) {
                    const { lat, lng } = addressCoordinates;
                    results = await directionService.route({
                        origin: {
                            lat: Number(coordinates.lat),
                            lng: Number(coordinates.lng),
                        },
                        destination: { lat, lng },
                        travelMode: "DRIVING",
                    });
                }

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
        const { coordinates: originCoordinates, place: originPlace } =
            closerStore;
        const objectResults = {
            origin: {
                address: originPlace,
                coordinates: originCoordinates,
            },
            distance: newDistance,
            closerStore,
        };
        if (address) {
            const { coordinates } = getTotalDataAddress({ address });
            objectResults.destination = {
                address,
                coordinates,
            };
        } else if (addressCoordinates) {
            const totalDataAddress = getTotalDataAddress({
                location: addressCoordinates,
            });
            objectResults.destination = {
                address: totalDataAddress.totalAddress,
                coordinates: addressCoordinates,
            };
        }
        return objectResults;
    }

    async function getTotalDataAddress({ address, location }) {
        let totalDataSelectedSuggestion;
        if (address) {
            [totalDataSelectedSuggestion] = await getGeocode({
                address,
            });
        } else if (location) {
            [totalDataSelectedSuggestion] = await getGeocode({
                location,
            });
        }

        const { lat, lng } = getLatLng(totalDataSelectedSuggestion);
        const addressFormatted = getAddressFormatted(
            totalDataSelectedSuggestion.address_components
        );
        return {
            totalAddress: totalDataSelectedSuggestion.formatted_address,
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
        calculateRoute,
        getTotalDataAddress,
    };
}
