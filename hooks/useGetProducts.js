import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addProductsList, updateProductsList } from '@/stores/products/slice'

export default function useGetProducts ({type}) {

    const products = useAppSelector(state => state.products[type])
    const dispatch = useAppDispatch()

    function handleAddProductsList({type, products}) {
        dispatch(addProductsList({type, products}))
    }

    function handleUpdateProduct(newProduct) {
        dispatch(updateProductsList(newProduct))
    }
    
    return { products, handleAddProductsList, handleUpdateProduct }
}