import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addProductsList } from '@/stores/products/slice'

export default function useGetProducts () {

    const products = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()

    function handleAddProductsList({type, products}) {
        dispatch(addProductsList({type, products}))
    }
    
    return { products, handleAddProductsList }
}