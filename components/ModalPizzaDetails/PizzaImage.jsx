import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useState, useRef, useEffect } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updatePizza, sendImage } from '@/services/productApi'

const regexImage = /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp)$/i

function urlValid(url) {
    return regexImage.test(url)
}

function validation(input, lastInput) {
    let error = ''
    if (!input) error = 'Este campo no puede estar vacío'
    else if (!urlValid(input)) error = 'URL inválido'
    else if (input === lastInput) error = 'Es el mismo URL anterior'
    return error
}

function errorStyles(error) {
    if (!error) return {}
    return {
        '&.Mui-disabled': {
            bgcolor: '#d32f2f',
            color:'#FFFDFF',
        }
    }
}

function PizzaImage({ pizza, property, handleChangeInput, pizzaNew, errors, handleInputsChecked, ...props }) {

    const [edit, setEdit] = useState( pizzaNew || false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')
    const [urlFallback, setUrlFallback] = useState('')
    const [ urlCurrentPizza, setUrlCurrentPiza ] = useState(pizza.image ? pizza.image : pizza.image + " ")
    const { handleUpdateProduct } = useGetProducts({type:'pizzas'})
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const fileInput = useRef()

    useEffect(() => {
        setUrlCurrentPiza(pizza.image)
    }, [pizza.image])

    function handleClick() {
        setEdit(prevState => !prevState)
    }

    function handleChange(newUrl) {
        setUrlFallback('')
        setUrl(newUrl)
        setError(validation(newUrl, urlCurrentPizza))
    }

    function handleError() {
        setUrlFallback('/icon-image-not-found-free-vector.jpg')
        setError('No podemos encontrar la imagen indicada')
    }

    async function saveImage() {
        console.log('Validando datos...')
        const newError = validation(url, urlCurrentPizza)
        if (newError) {
            console.log('Error en la validación de datos')
            return setError(newError)
        }
        console.log('Datos validados')
        if (pizzaNew) {
            handleInputsChecked(property, true)
            return handleChangeInput({value: url, property})
        }
        console.log('Guardando los datos...')
        setLoading(true)
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
            console.log('Datos guardados')
        }
        setLoading(false)
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
                    width: {
                        xs: '90%',
                        sm: '70%',
                        md: '50%'
                    },
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
                    {
                        !pizzaNew ? (
                            <IconButton
                                onClick={handleClick}
                                disabled={loading}
                            >
                                {
                                    edit ? (
                                        <CheckIcon />
                                    ) : (
                                        <EditIcon />
                                    )
                                }
                            </IconButton>
                        ) : (
                            null
                        )
                    }
                </Box>
            </Box>
            {
                edit ? (
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
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={saveImage}
                                                disabled={Boolean(error) || loading || urlCurrentPizza === url }
                                                sx={errorStyles(errors)}
                                            >
                                                {
                                                    edit ? (
                                                        <CheckIcon />
                                                    ) : (
                                                        <EditIcon />
                                                    )
                                                }
                                            </IconButton>
                                        )
                                    }}
                                    error={Boolean(error)}
                                    helperText={error}
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