import { useCallback } from "react";
import useGetExtraIngredients from "@/hooks/useGetExtraIngredients";
import useGetOrderList from "@/hooks/useGetOrderList";
import useLogedUser from "@/hooks/useLogedUser";

import { getExtraIngredients } from "@/services/productApi";
import { getAllOrders } from "@/services/orderApi";
import useLocalData from "./useLocalData";

function useLoadData() {
    const { handleAddExtraIngredinetsList } = useGetExtraIngredients();
    const { orderList, handleAddOrderList } = useGetOrderList();
    const { gerUserLoged } = useLogedUser();
    const { getLocalData } = useLocalData();

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

    return { loadData };
}

export default useLoadData;
