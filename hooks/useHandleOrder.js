import { useState, useEffect, useRef } from "react"
import useGetModal from '@/hooks/useGetModal'

export default function useHandleOrder({ product }) {

    const currentProduct = useRef(product)
    const [inputs, setInputs] = useState({
        size: '14"',
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
        console.log('inputs:', inputs)
    }, [inputs])

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

    function handleIngredients (event) {
        const ingredient = event.target.labels[0].textContent
        const isChecked = event.target.checked
        const newInput = {...inputs}
        const index = newInput.ingredients.indexOf(ingredient)
        if (isChecked) {
            if (index === -1) return
            newInput.ingredients.splice(index, 1)
        } else {
            if (index !== -1) return
            newInput.ingredients.push(ingredient)
        }
        setInputs(newInput)
        updateValue.current = {name: 'ingredients'}
    }

    function handleExtra (event) {
        const operation = event.target.name
        const extraName = event.target.value
        const newInputs = {...inputs}
        if (operation === '+') {
            newInputs.extra[extraName] = newInputs.extra[extraName] ? newInputs.extra[extraName] +=1 : 1
        } else if (operation === '-') {
            if (newInputs.extra[extraName] && newInputs.extra[extraName] >= 2) {
                newInputs.extra[extraName] -=1
            } else if (newInputs.extra[extraName] && newInputs.extra[extraName] === 1) {
                newInputs.extra[extraName] = undefined
            } else return
        } else return
        setInputs(newInputs)
        updateValue.current = {name: 'extra'}
    }

    return {
        // updateCurrentProduct,
        totalPrice,
        inputs,
        handleSize,
        handleQuantity,
        handleMass,
        handleIngredients,
        handleExtra
    }
}