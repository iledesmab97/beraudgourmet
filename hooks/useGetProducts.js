import { useAppSelector, useAppDispatch } from '@/hooks/store'
import { addProductsList, updateProductsList } from '@/stores/products/slice'

export default function useGetProducts ({type}) {

    const products = useAppSelector(state => state.products[type])
    const dispatch = useAppDispatch()

    function handleAddProductsList({type, products}) {
        dispatch(addProductsList({type, products}))
    }

    function handleUpdateProduct(newProduct) {
        const { type, id, property, value } = newProduct
        let index
        const [productToUpdate] = products.filter((element, i) => {
            if (element.id !== id) return false
            index = i
            return true
        })
        const productUpdated = {...productToUpdate}
        productUpdated[property] = value
        const newProductList = [...products]
        newProductList[index] = productUpdated
        dispatch(updateProductsList({type, newProductList}))
    }
    
    return { products, handleAddProductsList, handleUpdateProduct }
}