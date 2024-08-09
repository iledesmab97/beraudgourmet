import { useAppSelector } from "@/hooks/store";

export default function useGetProducts({ type }) {
    const products = useAppSelector((state) => state.products[type]);
    const totalProducts = useAppSelector((state) => state.products);

    return {
        products,
        totalProducts,
    };
}
