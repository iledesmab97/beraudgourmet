import { useCallback } from "react";
import useGetProducts from '@/hooks/useGetProducts'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import useLogedUser from '@/hooks/useLogedUser'
import useLocalData from '@/hooks/useLocalData'
import useGetStoreList from '@/hooks/useGetStoreList'

import { getPizzasWithCosts, getExtraIngredients, getSalads } from '@/services/productApi'
import { getAllStoresWithSchedules } from '@/services/storeApi'


function useLoadData() {

    const { gerUserLoged } = useLogedUser()
    const { handleAddProductsList } = useGetProducts({type:'pizzas'})
    const { handleAddExtraIngredinetsList } = useGetExtraIngredients()
    const { saveLocalData, getLocalData } = useLocalData()
    const { handleAddStoreList } = useGetStoreList()

    const loadData = useCallback(async () => {
        // Cargar las pizzas
        const pizzaList = await getPizzasWithCosts()
        handleAddProductsList({
            type: 'pizzas',
            products: pizzaList
        })
        // Cargar las ensaladas
        const saladList = await getSalads()
        handleAddProductsList({
            type: 'salads',
            products: saladList
        })
        // Cargar los ingredientes
        const ingredientList = await getExtraIngredients()
        handleAddExtraIngredinetsList({ extraIngredientsList: ingredientList })
        const userLoged = await gerUserLoged()
        const acceptCookies = getLocalData('acceptCookies')
        if (!acceptCookies && userLoged) {
            saveLocalData('acceptCookies', true)
        }
        // Cargar las tiendas
        const storeList = await getAllStoresWithSchedules()
        handleAddStoreList(storeList)
        
    }, [])

    return { loadData }
}

export default useLoadData