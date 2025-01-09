import { useState, useEffect, useRef, useMemo } from "react";
import useGetModal from "@/hooks/useGetModal";
import useGetExtraIngredients from "@/hooks/useGetExtraIngredients";

function initialInput(productDetails) {
    const genericInput = {
        ingredientsModal: productDetails?.ingredientsModal
            ? productDetails.ingredientsModal
            : [],
        extra: productDetails?.extra ? productDetails.extra : {},
        quantity: productDetails?.quantity ? productDetails.quantity : 1,
    };
    const extraInput = {};
    if (productDetails.productType === "pizza") {
        (extraInput.size = productDetails.size ? productDetails.size : "30cm"),
            (extraInput.mass = productDetails?.mass
                ? productDetails.mass
                : Object.keys(productDetails.price["30cm"])[0]);
    }

    const totalInput = {
        ...genericInput,
        ...extraInput,
    };

    return totalInput;
}

function getTotalPrice({ productDetails, inputs, extraIngredients }) {
    if (!productDetails) return 0;
    let price;
    if (productDetails.productType === "salad") {
        price = productDetails.totalPriceByUnity;
    } else {
        price =
            productDetails.price[inputs.size][inputs.mass].totalPriceByUnity;
    }
    const totalExtras = Object.keys(inputs.extra).reduce((acc, cur) => {
        const quantity = inputs.extra[cur] ? inputs.extra[cur] : 0;
        return acc + quantity * extraIngredients[cur].totalPrice;
    }, 0);
    const pizzaWithExtras = Number(price) + totalExtras;
    const totalPrice = inputs.quantity * pizzaWithExtras;
    return Math.ceil(totalPrice);
}

export default function useHandleOrder({ productDetails }) {
    const [currentProduct, setCurrentProduct] = useState(productDetails);
    const { extraIngredients } = useGetExtraIngredients();
    const [inputs, setInputs] = useState({});
    const { handleUpdateModalOrder } = useGetModal({ modalType: "order" });

    const updateValue = useRef(null);

    function handleCurrentProduct(newProduct) {
        setCurrentProduct(newProduct);
    }

    // Actualizar el currentProduct para asignarle las características específicas del pedido
    useEffect(() => {
        if (!productDetails) return;
        const newInput = initialInput(productDetails);
        setInputs(newInput);
        const totalPrice = getTotalPrice({
            productDetails,
            inputs: newInput,
            extraIngredients,
        });
        handleCurrentProduct({
            ...productDetails,
            size: newInput.size,
            quantity: newInput.quantity,
            mass: newInput.mass,
            ingredientsModal: newInput.ingredientsModal,
            extra: newInput.extra,
            totalPrice,
        });
    }, [productDetails]);

    // Actualizar las especificaciones del pedido en el global storage cuando se cierra el modal ChooseProduct
    useEffect(() => {
        if (!currentProduct) return;
        handleUpdateModalOrder(currentProduct);
    }, [currentProduct]);

    useEffect(() => {
        if (!updateValue.current) return;
        const { name } = updateValue.current;
        const totalPrice = getTotalPrice({
            productDetails,
            inputs,
            extraIngredients,
        });
        const newCurrentProduct = {
            ...currentProduct,
            [name]: inputs[name],
            totalPrice,
        };
        handleCurrentProduct(newCurrentProduct);
    }, [inputs]);

    function handleSize(event) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            size: event.target.value,
        }));
        updateValue.current = { name: "size" };
    }

    function handleQuantity(event) {
        const operation = event.target.name;
        setInputs((prevInput) => {
            let newValue;
            if (operation === "+") {
                newValue = prevInput.quantity += 1;
            } else if (operation === "-" && inputs.quantity > 1) {
                newValue = prevInput.quantity -= 1;
            } else {
                newValue = prevInput.quantity;
            }
            return {
                ...prevInput,
                quantity: newValue,
            };
        });
        updateValue.current = { name: "quantity" };
    }

    function handleMass(event) {
        setInputs((prevInput) => ({
            ...prevInput,
            mass: event.target.value,
        }));
        updateValue.current = { name: "mass" };
    }

    function handleIngredientsModal(event) {
        const ingredient = event.target.labels[0].textContent;
        const isChecked = event.target.checked;
        const newInput = structuredClone(inputs);
        const index = newInput.ingredientsModal.indexOf(ingredient);
        if (isChecked) {
            if (index === -1) return;
            newInput.ingredientsModal.splice(index, 1);
        } else {
            if (index !== -1) return;
            newInput.ingredientsModal.push(ingredient);
        }
        setInputs(newInput);
        updateValue.current = { name: "ingredientsModal" };
    }

    function handleExtra({ ingredient, operation }) {
        const extraName = ingredient.name;
        const newInputs = structuredClone(inputs);
        if (operation === "+") {
            newInputs.extra[extraName] = newInputs.extra[extraName]
                ? (newInputs.extra[extraName] += 1)
                : 1;
        } else if (operation === "-") {
            if (newInputs.extra[extraName] && newInputs.extra[extraName] >= 2) {
                newInputs.extra[extraName] -= 1;
            } else if (
                newInputs.extra[extraName] &&
                newInputs.extra[extraName] === 1
            ) {
                delete newInputs.extra[extraName];
            } else return;
        } else return;
        setInputs(newInputs);
        updateValue.current = { name: "extra" };
    }

    return {
        currentProduct,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredientsModal,
        handleExtra,
    };
}
