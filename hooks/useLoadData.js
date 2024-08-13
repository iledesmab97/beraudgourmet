import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useGetExtraIngredients from "@/hooks/useGetExtraIngredients";
import useGetOrderList from "@/hooks/useGetOrderList";
import useLogedUser from "@/hooks/useLogedUser";
import useGetUser from "@/hooks/useGetUser";
import useGetPlace from "@/hooks/useGetPlace";

import { lookingForUserLoged } from "@/services/userApi";
import { getExtraIngredients } from "@/services/productApi";
import { getAllOrders } from "@/services/orderApi";
import useLocalData from "./useLocalData";
import { deepEqual, validPlaceLocal } from "@/utils/preparingData";

function useLoadData() {
    const { handleAddExtraIngredinetsList } = useGetExtraIngredients();
    const { orderList, handleAddOrderList } = useGetOrderList();
    const { gerUserLoged } = useLogedUser();
    const { getLocalData, saveLocalData, removeLocalData } = useLocalData();
    const { handleAddUser } = useGetUser();
    const { place, handleAddPlace } = useGetPlace();
    const {
        stores: storeListArray,
        status,
        error,
    } = useSelector((state) => state.storeList);
    const firstTime = useRef(true);

    const loadData = useCallback(async (rol) => {
        // Cargar usuario
        if (rol === "admin") {
            const userLoged = await lookingForUserLoged();
            if (userLoged) {
                handleAddUser(userLoged);
            }
        } else {
            const userLoged = await gerUserLoged();
            const acceptCookies = getLocalData("acceptCookies");
            if (!acceptCookies && userLoged) {
                saveLocalData("acceptCookies", true);
            }
        }
        // Cargar los ingredientes
        const ingredientList = await getExtraIngredients();
        handleAddExtraIngredinetsList({ extraIngredientsList: ingredientList });
        // Cargar ordenes
        if (rol === "admin") {
            const newOrderList = await getAllOrders({
                p: orderList.currentPage,
            });
            if (newOrderList.message) alert(newOrderList.message);
            else handleAddOrderList(newOrderList);
        }
    }, []);

    // update data from place to localStorage
    useEffect(() => {
        if (status !== "succeeded") return;
        const placeLocal = getLocalData("place");
        // load data from localStorage
        if (firstTime.current && placeLocal) {
            const isPlaceValid = validPlaceLocal(placeLocal);
            if (!isPlaceValid) {
                return removeLocalData("place");
            }
            firstTime.current = false;
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
            firstTime.current = false;
            if (!Object.keys(place).length) return;
            const placeToCompare = {
                ...place,
                closerStore: place.closerStore.id,
            };
            if (!deepEqual(placeLocal, placeToCompare)) {
                saveLocalData("place", placeToCompare);
            }
        }
    }, [status, place]);

    return { loadData };
}

export default useLoadData;
