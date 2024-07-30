import { useCallback } from "react";
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import useLogedUser from '@/hooks/useLogedUser'
import useLocalData from '@/hooks/useLocalData'
import useGetStoreList from '@/hooks/useGetStoreList'
import useGetUser from '@/hooks/useGetUser'
import useGetOrderList from '@/hooks/useGetOrderList'

import { getPizzasWithCosts, getExtraIngredients, getSalads } from '@/services/productApi'
import { getAllStoresWithSchedules } from '@/services/storeApi'
import { lookingForUserLoged } from '@/services/userApi'
import { getAllOrders } from '@/services/orderApi'

function useLoadData() {

    const { gerUserLoged } = useLogedUser()
    const { handleAddProductsList } = useGetProducts({type:'pizzas'})
    const { handleAddExtraIngredinetsList } = useGetExtraIngredients()
    const { saveLocalData, getLocalData } = useLocalData()
    const { handleAddStoreList } = useGetStoreList()
    const { handleAddUser } = useGetUser()
    const { orderList, handleAddOrderList } = useGetOrderList()

    const loadData = useCallback(async (rol) => {

        // Cargar usuario
        if (rol === 'admin') {
            const userLoged = await lookingForUserLoged()
            if (userLoged) {
                handleAddUser(userLoged)
            }
        } else {
            const userLoged = await gerUserLoged()
            const acceptCookies = getLocalData('acceptCookies')
            if (!acceptCookies && userLoged) {
                saveLocalData('acceptCookies', true)
            }
        }
        // Cargar las pizzas
        const pizzaList = await getPizzasWithCosts()
        if (pizzaList.message) {
            alert(pizzaList.message)
        } else {
            handleAddProductsList({
                type: 'pizzas',
                products: pizzaList
            })
        }
        // Cargar las ensaladas
        const saladList = await getSalads()
        handleAddProductsList({
            type: 'salads',
            products: saladList
        })
        // Cargar las tiendas
        const storeList = await getAllStoresWithSchedules()
        handleAddStoreList(storeList)
        // Cargar los ingredientes
        const ingredientList = await getExtraIngredients()
        handleAddExtraIngredinetsList({ extraIngredientsList: ingredientList })
        // Cargar ordenes
        if (rol === 'admin') {
            const newOrderList = await getAllOrders({ p: orderList.currentPage })
            if (newOrderList.message) alert(newOrderList.message)
            else handleAddOrderList(newOrderList)
        }
    }, [])

    return { loadData }
}

export default useLoadData