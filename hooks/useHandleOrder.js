import { useState, useEffect, useRef, useMemo } from "react"
import useGetModal from '@/hooks/useGetModal'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import items from '@/menuStore.json'

export default function useHandleOrder({ product }) {

    const [currentProduct, setCurrentProduct] = useState(product)
    const { extraIngredients } = useGetExtraIngredients()
    const [inputs, setInputs] = useState({
        size: product.size ? product.size : '30cm',
        quantity: product?.quantity ? product.quantity : 1,
        mass: product?.mass ? product.mass : 'Masa Tradicional',
        ingredientsModal: product?.ingredientsModal ? product.ingredientsModal : [],
        extra: product?.extra ? product.extra : {}
    })
    const { edit, handleUpdateModalOrder} = useGetModal({modalType:'order'})

    const totalPrice = useMemo(() => {
        const price = product.price[inputs.size][inputs.mass]
        const totalExtras = Object.keys(inputs.extra).reduce((acc, cur) => {
            const quantity = inputs.extra[cur] ? inputs.extra[cur] : 0
            return acc + quantity * extraIngredients[cur].totalPrice
        }, 0)
        const pizzaWithExtras = Number(price) + totalExtras
        const totalPrice = inputs.quantity * (pizzaWithExtras)
        return Math.ceil(totalPrice)
    }, [inputs])

    const updateValue = useRef(null)
    const firstLoad = useRef(true)
    const addedItem = useRef(false)

    function handleAddedItem() {
        addedItem.current = !addedItem.current
    }

    function handleCurrentProduct(newProduct) {
        setCurrentProduct(newProduct)
    }

    useEffect(() => {
        const newCurrentProduct = {
            ...currentProduct,
            size: inputs.size,
            quantity: inputs.quantity,
            mass: inputs.mass,
            ingredientsModal: inputs.ingredientsModal,
            extra: inputs.extra,
            totalPrice
        }
        handleCurrentProduct(newCurrentProduct)
    }, [])

    useEffect(() => {
        firstLoad.current = false
        return () => {
            if (edit) return
            if (addedItem.current) {
                for (const item of items) {
                    if (item.name === currentProduct.name) {
                        handleUpdateModalOrder(item)
                    }
                }
            } else {
                handleUpdateModalOrder(currentProduct)
            }
        }
    }, [currentProduct])

    useEffect(() => {
        if (!updateValue.current) return
        const { name } = updateValue.current
        const newCurrentProduct = {
            ...currentProduct,
            [name]: inputs[name],
            totalPrice
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

    function handleExtra ({ingredient, operation}) {
        const extraName = ingredient.name
        const newInputs = structuredClone(inputs)
        if (operation === '+') {
            newInputs.extra[extraName] = newInputs.extra[extraName] ? newInputs.extra[extraName] +=1 : 1
        } else if (operation === '-') {
            if (newInputs.extra[extraName] && newInputs.extra[extraName] >= 2) {
                newInputs.extra[extraName] -=1
            } else if (newInputs.extra[extraName] && newInputs.extra[extraName] === 1) {
                delete newInputs.extra[extraName]
            } else return
        } else return
        setInputs(newInputs)
        updateValue.current = {name: 'extra'}
    }

    return {
        currentProduct,
        totalPrice,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredientsModal,
        handleExtra,
        handleAddedItem
    }
}