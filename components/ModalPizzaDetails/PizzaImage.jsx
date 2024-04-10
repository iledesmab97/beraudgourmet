import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updatePizza } from '@/services/productApi'

const regexImage = /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp)$/i

function urlValid(url) {
    return regexImage.test(url)
}

function PizzaImage({ pizza, property, handleChangeInput, pizzaNew, ...props }) {

    const [openInput, setOpenInput] = useState( pizzaNew || false)
    const [url, setUrl] = useState('')
    const [urlFallback, setUrlFallback] = useState('')
    const [ urlCurrentPizza, setUrlCurrentPiza ] = useState(pizza.image)
    const { handleUpdateProduct } = useGetProducts({type:'pizzas'})
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleClick() {
        setOpenInput(prevState => !prevState)
    }

    function handleChange(event) {
        setUrlFallback('')
        setUrl(event.target.value)
        handleChangeInput({value: event.target.value, property})
    }

    function handleError() {
        setUrlFallback('/icon-image-not-found-free-vector.jpg')
    }

    async function saveImage() {
        const response = await updatePizza( pizza.id, {property: 'image', value: url})
        let text, status
        if (response.message) {
            text = response.message
            status = 'error'
        } else {
            text = response
            status = 'success'
        }
        handleUpdateAlertMessage({
            checked: true,
            text,
            status
        })
        if (!response.message) {
            handleUpdateProduct({
                type: 'pizzas',
                id: pizza.id,
                property: 'image',
                value: url
            })
            setUrlCurrentPiza(url)
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '50%',
                    height: '200px',
                    minHeight: '200px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Image
                    src={ urlFallback || (urlValid(url) ? url : urlValid(urlCurrentPizza) ? urlCurrentPizza : '/icon-image-not-found-free-vector.jpg' ) }
                    alt={ pizza.name }
                    fill={true}
                    sizes='auto'
                    onError={handleError}
                    style={{
                        objectFit: 'contain'
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px'
                    }}
                >
                    <IconButton
                        onClick={handleClick}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            </Box>
            {
                openInput ? (
                    <TextField
                        value={url}
                        onChange={handleChange}
                        fullWidth
                        InputProps={ !pizzaNew && {
                            endAdornment: (
                                <IconButton
                                    onClick={saveImage}
                                    disabled={(urlFallback !== '') || (url === '') || (url === urlCurrentPizza ) || (!urlValid(url))}
                                >
                                    <CheckIcon />
                                </IconButton>
                            )
                        }}
                        {...props}
                    />
                ) : null
            }
        </>
    )
}

export default PizzaImage