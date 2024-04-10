import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useState, useRef } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updatePizza, sendImage } from '@/services/productApi'

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
    const fileInput = useRef()

    function handleClick() {
        setOpenInput(prevState => !prevState)
    }

    function handleChange(newUrl) {
        setUrlFallback('')
        setUrl(newUrl)
        handleChangeInput({value: newUrl, property})
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

    function uploadImage() {
        console.log('cargando imagen')
        fileInput.current.click()
    }

    async function handleFileSelected(event) {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const response = await sendImage(formData)
        const {message, status, url} = response
        handleUpdateAlertMessage({
            checked: true,
            text: message,
            status: status
        })
        if (status === 'success' ) {
            handleChange(url)
        }
        console.log('imagen cargada exitosamente')
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
                    <>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: '80%'
                                }}
                            >
                                <TextField
                                    value={url}
                                    onChange={(event) => {handleChange(event.target.value)}}
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
                            </Box>
                            <Button
                                variant='contained'
                                size='large'
                                sx={{
                                    mr: '16px'
                                }}
                                onClick={uploadImage}
                            >
                                <CloudUploadIcon />
                                <input type='file' onChange={handleFileSelected} ref={fileInput} style={{display: 'none'}} />
                            </Button>
                        </Box>
                    </>
                ) : null
            }
        </>
    )
}

export default PizzaImage