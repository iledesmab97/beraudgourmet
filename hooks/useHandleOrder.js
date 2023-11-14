import { useState, useEffect, useRef, useMemo } from "react"
import useGetModal from '@/hooks/useGetModal'
import totalIngredients from '@/ingredients.json'

export default function useHandleOrder({ product }) {

    const currentProduct = useRef(product)
    const [inputs, setInputs] = useState({
        size: product.size ? product.size : '14"',
        quantity: product?.quantity ? product.quantity : 1,
        mass: product?.mass ? product.mass : 'Masa Tradicional',
        ingredientsModal: product?.ingredientsModal ? product.ingredientsModal : [],
        extra: product?.extra ? product.extra : {}
    })
    const {handleUpdateModalOrder} = useGetModal({modalType:'order'})

    const totalPrice = useMemo(() => {
        const price = product.price[inputs.size][inputs.mass]
        const totalExtras = Object.keys(inputs.extra).reduce((acc, cur) => {
            return acc + inputs.extra[cur] * totalIngredients[cur].price
        }, 0)
        return inputs.quantity * (price + totalExtras)
    }, [inputs])

    const updateValue = useRef(null)
    const firstLoad = useRef(true)

    function handleCurrentProduct(newProduct) {
        currentProduct.current = newProduct
    }

    useEffect(() => {
        if (firstLoad) {
            firstLoad.current = false
            return () => {
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

    function handleSize (event) {
        setInputs(prevInputs => ({
            ...prevInputs,
            size: event.target.value
        }))
        updateValue.current = {name: 'size'}
    }

    function handleQuantity (event) {
        const operation = event.target.name
        setInputs(prevInput => {
            let newValue
            if (operation === '+') {
              newValue = prevInput.quantity+=1
            } else if (operation === '-' && inputs.quantity > 1) {
              newValue = prevInput.quantity-=1
            } else {
                newValue = prevInput.quantity
            }
            return {
                ...prevInput,
                quantity: newValue
            }
        })
        updateValue.current = {name: 'quantity'}
    }

    function handleMass (event) {
        setInputs(prevInput => ({
            ...prevInput,
            mass: event.target.value
        }))
        updateValue.current = {name: 'mass'}
    }

    function handleIngredientsModal (event) {
        const ingredient = event.target.labels[0].textContent
        const isChecked = event.target.checked
        const newInput = structuredClone(inputs)
        const index = newInput.ingredientsModal.indexOf(ingredient)
        if (isChecked) {
            if (index === -1) return
            newInput.ingredientsModal.splice(index, 1)
        } else {
            if (index !== -1) return
            newInput.ingredientsModal.push(ingredient)
        }
        setInputs(newInput)
        updateValue.current = {name: 'ingredientsModal'}
    }

    function handleExtra (event) {
        const operation = event.target.name
        const extraName = event.target.value
        const newInputs = structuredClone(inputs)
        if (operation === '+') {
            newInputs.extra[extraName] = newInputs.extra[extraName] ? newInputs.extra[extraName] +=1 : 1
        } else if (operation === '-') {
            if (newInputs.extra[extraName] && newInputs.extra[extraName] >= 2) {
                newInputs.extra[extraName] -=1
            } else if (newInputs.extra[extraName] && newInputs.extra[extraName] === 1) {
                newInputs.extra[extraName] = 0
            } else return
        } else return
        setInputs(newInputs)
        updateValue.current = {name: 'extra'}
    }

    return {
        currentProduct: currentProduct.current,
        totalPrice,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredientsModal,
        handleExtra
    }
}