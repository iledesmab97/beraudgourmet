import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { updateProductsList } from "@/stores/products/slice";

export default function useGetProducts({ type }) {
    const products = useAppSelector((state) => state.products[type]);
    const totalProducts = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    function handleUpdateProduct(newProduct) {
        const { type, id, property, value } = newProduct;
        let index;
        const [productToUpdate] = products.filter((element, i) => {
            if (element.id !== id) return false;
            index = i;
            return true;
        });
        const productUpdated = { ...productToUpdate };
        productUpdated[property] = value;
        const newProductList = [...products];
        newProductList[index] = productUpdated;
        dispatch(updateProductsList({ type, newProductList }));
    }

    function handleDeleteProduct(newProduct) {
        const { type, id } = newProduct;
        const newProductList = products.filter((element) => {
            if (element.id !== id) return true;
            return false;
        });
        dispatch(updateProductsList({ type, newProductList }));
    }

    function handleUpdateManyPropertiesProduct(newProduct) {
        const { type, id, properties } = newProduct;
        let index;
        const productToUpdate = products.find((element, i) => {
            if (element.id !== id) return false;
            index = i;
            return true;
        });
        const productUpdated = { ...productToUpdate, ...properties };
        const newProductList = [...products];
        newProductList[index] = productUpdated;
        dispatch(updateProductsList({ type, newProductList }));
    }

    return {
        products,
        totalProducts,
        handleUpdateProduct,
        handleDeleteProduct,
        handleUpdateManyPropertiesProduct,
    };
}
