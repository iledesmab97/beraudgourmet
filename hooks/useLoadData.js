import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useGetExtraIngredients from "@/hooks/useGetExtraIngredients";
import useGetOrderList from "@/hooks/useGetOrderList";
import useLogedUser from "@/hooks/useLogedUser";
import useGetUser from "@/hooks/useGetUser";
import useGetPlace from "@/hooks/useGetPlace";
import useGetOrders from "@/hooks/useGetOrders";

import { lookingForUserLoged } from "@/services/userApi";
import { getExtraIngredients } from "@/services/ingredientApi";
import { getAllOrders } from "@/services/orderApi";
import useLocalData from "./useLocalData";
import { deepEqual, validPlaceLocal } from "@/utils/preparingData";

function useLoadData() {
    const { handleAddExtraIngredinetsList } = useGetExtraIngredients();
    const { orderList, handleAddOrderList } = useGetOrderList();
    const { orders, handleUpdateTotalOrders } = useGetOrders();
    const { gerUserLoged } = useLogedUser();
    const { getLocalData, saveLocalData, removeLocalData } = useLocalData();
    const { handleAddUser } = useGetUser();
    const { place, handleAddPlace } = useGetPlace();
    const {
        stores: storeListArray,
        status,
        error,
    } = useSelector((state) => state.storeList);
    const {
        pizzas,
        salads,
        status: productsStatus,
        error: productsError,
    } = useSelector((state) => state.products);
    const firstTimePlace = useRef(true);
    const firstTimeOrders = useRef(true);

    const loadData = useCallback(async (rol) => {
        try {
            // Cargar usuario
            // if (rol === "admin") {
            //     const userLoged = await lookingForUserLoged();
            //     if (userLoged) {
            //         handleAddUser(userLoged);
            //     }
            // } else {
            const userLoged = await gerUserLoged();
            const acceptCookies = getLocalData("acceptCookies");
            if (!acceptCookies && userLoged) {
                saveLocalData("acceptCookies", true);
            }
            // }

            // Cargar los ingredientes
            const ingredientList = await getExtraIngredients({
                sort: "name:ASC",
                relation: "defaultPortion",
                relation2: "defaultPortion.KindProduct",
            });
            handleAddExtraIngredinetsList({
                extraIngredientsList: ingredientList,
            });
            // Cargar ordenes
            if (rol === "admin") {
                const newOrderList = await getAllOrders({
                    p: orderList.currentPage,
                });
                if (newOrderList.message) alert(newOrderList.message);
                else handleAddOrderList(newOrderList);
            }
        } catch (error) {
            alert(error.message);
        }
    }, []);

    // update data from place to localStorage
    useEffect(() => {
        if (status !== "succeeded") return;
        const placeLocal = getLocalData("place");
        // load data from localStorage
        if (firstTimePlace.current && placeLocal) {
            const isPlaceValid = validPlaceLocal(placeLocal);
            if (!isPlaceValid) {
                return removeLocalData("place");
            }
            firstTimePlace.current = false;
            const closerStore = storeListArray.find(
                (store) => store.id === placeLocal.closerStore
            );
            if (!Object.keys(place).length && placeLocal && closerStore) {
                handleAddPlace({
                    ...placeLocal,
                    closerStore,
                });
            }
        } else {
            // update every time the place is modified
            firstTimePlace.current = false;
            if (!Object.keys(place).length) return;
            let placeToCompare = { ...place };
            if (place.closerStore) {
                placeToCompare.closerStore = place.closerStore.id;
            }
            const areThereChanges = !deepEqual(placeLocal, placeToCompare);
            if (areThereChanges) {
                saveLocalData("place", placeToCompare);
            }
        }
    }, [status, place]);

    // Actualizar las ordenes en función del localStorage en la primera carga y en el resto actualizar el local storage
    useEffect(() => {
        if (productsStatus !== "succeeded") return;
        const ordersLocal = getLocalData("orders");
        if (firstTimeOrders.current) {
            firstTimeOrders.current = false;
            if (!orders.length && ordersLocal?.length) {
                handleUpdateTotalOrders(
                    ordersLocal.map((item) => {
                        const { productType } = item;
                        let dataItemDB;
                        switch (productType) {
                            case "pizza": {
                                dataItemDB = pizzas.find(
                                    (element) => element.id === item.id
                                );
                                break;
                            }
                            case "salad": {
                                dataItemDB = salads.find(
                                    (element) => element.id === item.id
                                );
                                break;
                            }
                        }
                        return {
                            ...dataItemDB,
                            ...item,
                        };
                    })
                );
            }
        } else {
            const orderToCompare = orders.map((item) => {
                const { productType } = item;
                const { id, quantity, ingredientsModal, extra, totalPrice } =
                    item;
                let objectToSave = {
                    id,
                    quantity,
                    ingredientsModal,
                    extra,
                    totalPrice,
                    productType,
                };
                switch (productType) {
                    case "pizza": {
                        const { size, mass } = item;
                        objectToSave = {
                            ...objectToSave,
                            size,
                            mass,
                        };
                        break;
                    }
                    case "salad": {
                        break;
                    }
                }
                return objectToSave;
            });
            if (!deepEqual(ordersLocal, orderToCompare)) {
                saveLocalData("orders", orderToCompare);
            }
        }
    }, [productsStatus, orders, productsError]);

    return { loadData };
}

export default useLoadData;
