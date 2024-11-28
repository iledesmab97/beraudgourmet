import { useState, useEffect } from "react";
import useGetPlace from "./useGetPlace";
import useGetStoreList from "@/hooks/useGetStoreList";
import typeLocations from "@/typePlaces.json";

function getInitialInputHome(primaryInputHome) {
    if (primaryInputHome) return primaryInputHome;
    const initiaInputHome = {
        inputAddress: "",
        street: {
            ["number"]: "",
            ["streetName"]: "",
        },
        city: "",
        postalCode: "",
        note: "",
        type: {
            name: "home",
            totalName: "Casa: Dirección residencial",
        },
        distanceSaved: null,
        withinLimitSaved: null,
    };
    return initiaInputHome;
}

function useHandlePlace({ primaryInputHome }) {
    const { storeList } = useGetStoreList();
    const { place } = useGetPlace();
    const [inputsStore, setInputsStore] = useState(() => {
        return Object.keys(storeList)[0];
    });
    const [typeLocation, setTypeLocation] = useState(() => {
        if (primaryInputHome) {
            return typeLocations[primaryInputHome.type.name];
        }
        return typeLocations.home;
    });
    const [closerStore, setCloserStore] = useState(null);
    const [inputsHome, setInputsHome] = useState(
        getInitialInputHome(primaryInputHome)
    );

    // Update inputsHome when primaryInputHome changed
    useEffect(() => {
        if (!primaryInputHome) return;
        setInputsHome(primaryInputHome);
        setTypeLocation(typeLocations[primaryInputHome.type.name]);
    }, [primaryInputHome]);

    useEffect(() => {
        setInputsStore(Object.keys(storeList)[0]);
    }, [storeList]);

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
