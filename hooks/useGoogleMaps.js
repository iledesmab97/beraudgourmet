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
                console.error("error:", error);
                continue;
            }
        }
        if (!closerStore) {
            alert(
                "En este momento no estamos prestando el servicio de delivery a este lugar"
            );
            return {};
        }
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

    const requestLocationPermission = async () => {
        if (navigator.geolocation) {
            return await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({
                            status: "granted",
                            coordinates: { lat: latitude, lng: longitude },
                        });
                    },
                    (error) => {
                        console.log("recuerdo haber dicho que no...");
                        reject({ status: "denied" });
                    }
                );
            });
        } else {
            console.error("Geolocation no está soportado por este navegador.");
            return { status: "denied" };
        }
    };

    async function getHomeDataDirection(position) {
        const { lat, lng } = position;
        const totalDataAddress = await getTotalDataAddress({
            location: {
                lat,
                lng,
            },
        });
        const {
            totalAddress: inputAddress,
            streetNumber,
            route,
            city,
            state,
            zipCode,
            country,
            coordinates,
        } = totalDataAddress;
        const newInputHome = {
            inputAddress,
            type: {
                name: "home",
                totalName: "Casa: Dirección residencial",
            },
            city,
            postalCode: zipCode,
            street: {
                number: streetNumber,
                streetName: route,
            },
            state,
            country,
            coordinates,
        };
        return newInputHome;
    }

    return {
        calculateRoute,
        getTotalDataAddress,
        requestLocationPermission,
        getHomeDataDirection,
    };
}
