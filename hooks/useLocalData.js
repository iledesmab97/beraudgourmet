import { useCallback, useEffect, useRef, useState } from "react";
import useGetPlace from "@/hooks/useGetPlace";
import useGetOrders from "@/hooks/useGetOrders";
import useGetStoreList from "@/hooks/useGetStoreList";
import useGetProducts from "@/hooks/useGetProducts";

import { deepEqual, listStores, validPlaceLocal } from "@/utils/preparingData";
import { useSelector } from "react-redux";

function useLocalData() {
    const { place, handleAddPlace } = useGetPlace();
    const { orders, handleUpdateTotalOrders } = useGetOrders();
    const { totalProducts } = useGetProducts({ type: "pizzas" });
    const { storeList } = useGetStoreList();

    const {
        stores: storeListArray,
        status,
        error,
    } = useSelector((state) => state.storeList);

    const firstTime = useRef(true);
    const firstTimeOrders = useRef(true);

    useEffect(() => {
        if (!storeListArray.length) return;
        const placeLocal = getLocalData("place");
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
            if (!Object.keys(place).length) return;
            const placeToCompare = {
                ...place,
                closerStore: place.closerStore.id,
            };
            if (!deepEqual(placeLocal, placeToCompare)) {
                saveLocalData("place", placeToCompare);
            }
        }
    }, [place, storeListArray]);

    // Actualizar las ordenes en función del localStorage en la primera carga y en el resto actualizar el local storage
    useEffect(() => {
        if (!totalProducts || !totalProducts.pizzas || !totalProducts.salads)
            return;
        const ordersLocal = getLocalData("orders");
        if (firstTimeOrders.current) {
            firstTimeOrders.current = false;
            if (!orders.length && ordersLocal?.length) {
                const { pizzas, salads } = totalProducts;
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
    }, [orders, totalProducts]);

    const getLocalData = useCallback((key) => {
        const dataFromLocal = localStorage.getItem(key);
        return JSON.parse(dataFromLocal);
    }, []);

    const saveLocalData = useCallback((key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }, []);

    const removeLocalData = useCallback((key) => {
        localStorage.removeItem(key);
    }, []);

    const removeAllLocalData = useCallback(() => {
        localStorage.clear();
    }, []);

    return { getLocalData, saveLocalData, removeLocalData, removeAllLocalData };
}

export default useLocalData;
