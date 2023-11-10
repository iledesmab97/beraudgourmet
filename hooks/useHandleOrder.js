import { useState, useEffect, useRef } from "react"
import useGetModal from '@/hooks/useGetModal'

export default function useHandleOrder({ product }) {

    // const [currentProduct, setCurrentProduct] = useState(product)
    const currentProduct = useRef(product)
    const [inputs, setInputs] = useState({
        quantity: product?.quantity ? product.quantity : 1,
        mass: 'Masa Tradicional',
        ingredients: [],
        extra: {}
    })
    const {handleUpdateModalOrder} = useGetModal({modalType:'order'})

    const totalPrice = product?.price ? inputs.quantity*product.price : 0
    const updateValue = useRef(null)
    const firstLoad = useRef(true)

    function handleCurrentProduct(newProduct) {
        currentProduct.current = newProduct
    }

    useEffect(() => {
        console.log('el valor de currentProduct es:', currentProduct.current)
    }, [currentProduct])

    useEffect(() => {
        if (firstLoad) {
            firstLoad.current = false
            return () => {
                console.log('antes de salir, el valor de curentProduct es:', currentProduct.current)
                handleUpdateModalOrder(currentProduct.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!updateValue.current) return
        const { name } = updateValue.current
        const newCurrentProduct = {
            ...currentProduct.current,
            [name]: inputs[name]
        }
        handleCurrentProduct(newCurrentProduct)
    }, [inputs])

    function handleQuantity (event) {
        const operation = event.target.name
        setInputs(prevInput => {
            let newValue
            if (operation === '+') {
              newValue = prevInput.quantity+=1
            } else if (operation === '-' && inputs.quantity > 1) {
              newValue = prevInput.quantity-=1
            } else {
                newValue = prevInput
            }
            return {
                ...prevInput,
                quantity: newValue
            }
        })
        updateValue.current = {name: 'quantity'}
    }

    function handleMass (event) {
        // setMass({name: event.target.value})
    }

    function handleIngredients (event) {

    }

    function handleExtra (event) {

    }

    return {
        // updateCurrentProduct,
        totalPrice,
        inputs,
        handleQuantity,
        handleMass,
        handleIngredients,
        handleExtra
    }
}