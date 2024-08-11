import { useState, useEffect } from "react";
import useGetPlace from "./useGetPlace";
import useGetStoreList from "@/hooks/useGetStoreList";
import typeLocations from "@/typePlaces.json";

function useHandlePlace() {
    const { storeList } = useGetStoreList();
    const { place } = useGetPlace();
    const [inputsStore, setInputsStore] = useState(() => {
        return Object.keys(storeList)[0];
    });
    const [typeLocation, setTypeLocation] = useState(() => {
        if (place.inputsHome) return typeLocations[place.inputsHome.type.name];
        return typeLocations.home;
    });
    const [closerStore, setCloserStore] = useState(null);
    const [inputsHome, setInputsHome] = useState(() => {
        if (place.inputsHome) return place.inputsHome;
        return {
            inputAddress: "",
            street: {
                ["unity"]: "",
                ["number"]: "",
                ["streetName"]: "",
            },
            city: "",
            postalCode: "",
            note: "",
            type: {
                name: typeLocation.name,
                totalName: typeLocation.totalName,
            },
            distanceSaved: null,
            withinLimitSaved: null,
        };
    });

    useEffect(() => {
        setInputsStore(Object.keys(storeList)[0]);
    }, [storeList]);

    useEffect(() => {
        if (
            place.inputsHome &&
            place.inputsHome.inputAddress !== inputsHome?.inputAddress
        )
            setInputsHome(place.inputsHome);
        else if (!place.inputsHome && inputsHome?.inputAddress) {
            setInputsHome({
                inputAddress: "",
                street: {
                    ["unity"]: "",
                    ["number"]: "",
                    ["streetName"]: "",
                },
                city: "",
                postalCode: "",
                note: "",
                type: {
                    name: typeLocation.name,
                    totalName: typeLocation.totalName,
                },
                distanceSaved: null,
                withinLimitSaved: null,
            });
        }
        if (place.closerStore && place.closerStore.name !== closerStore?.name)
            setCloserStore(place.closerStore);
    }, [place]);

    function handleCloserStore(newCloserStore) {
        setCloserStore(newCloserStore);
    }

    function handleTypeLocation(event) {
        const { value } = event.target;
        const newTypeLocation = typeLocations[value];
        setTypeLocation(newTypeLocation);
        const newStreet = {};
        let newOther = {};
        newTypeLocation.street.forEach((item) => {
            if (inputsHome.street[item.name]) {
                newStreet[item.name] = inputsHome.street[item.name];
            } else {
                newStreet[item.name] = "";
            }
        });
        if (newTypeLocation.other) {
            newTypeLocation.other.inputs.forEach((item) => {
                newOther[item.name] = "";
            });
        } else {
            newOther = undefined;
        }
        setInputsHome((prevInputsHome) => ({
            ...prevInputsHome,
            street: newStreet,
            other: newOther,
            type: {
                name: newTypeLocation.name,
                totalName: newTypeLocation.totalName,
            },
        }));
    }

    function changeWithinLimitSaved(value) {
        setInputsHome((prevInputsHome) => ({
            ...prevInputsHome,
            withinLimitSaved: value,
        }));
    }

    function handleDistanceSaved(value) {
        setInputsHome((prevInputsHome) => ({
            ...prevInputsHome,
            distanceSaved: value,
        }));
    }

    function handleInputsStore(event) {
        const newValue = event.target.textContent;
        if (!newValue) return;
        setInputsStore(newValue);
    }

    function handleInputsAddress(value) {
        setInputsHome((prevInputsHome) => ({
            ...prevInputsHome,
            inputAddress: value,
        }));
    }

    function handleInputsHome(event) {
        const { value, name } = event.target;
        if (name === "streetName" || name === "number" || name === "unity") {
            const newInputs = {
                ...inputsHome,
                street: {
                    ...inputsHome.street,
                    [name]: value,
                },
            };
            setInputsHome(newInputs);
        } else if (
            name === "city" ||
            name === "postalCode" ||
            name === "note"
        ) {
            const newInputs = {
                ...inputsHome,
                [name]: value,
            };
            setInputsHome(newInputs);
        } else {
            const newInputs = {
                ...inputsHome,
                other: {
                    ...inputsHome.other,
                    [name]: value,
                },
            };
            setInputsHome(newInputs);
        }
    }

    return {
        inputsStore,
        inputsHome,
        typeLocation,
        closerStore,
        changeWithinLimitSaved,
        handleInputsStore,
        handleInputsAddress,
        handleDistanceSaved,
        handleInputsHome,
        handleTypeLocation,
        handleCloserStore,
    };
}

export default useHandlePlace;
