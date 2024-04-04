import TextField from '@mui/material/TextField'
import Image from 'next/image'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState } from 'react'

const regexImage = /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp)$/i

function urlValid(url) {
    return regexImage.test(url)
}

function PizzaImage({ pizza }) {

    const [openInput, setOpenInput] = useState(false)
    const [url, setUrl] = useState('')
    const [urlFallback, setUrlFallback] = useState('')

    function handleClick() {
        setOpenInput(prevState => !prevState)
    }

    function handleChange(event) {
        setUrlFallback('')
        setUrl(event.target.value)
    }

    function handleError() {
        setUrlFallback('/icon-image-not-found-free-vector.jpg')
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
                    src={ urlFallback || (urlValid(url) ? url : pizza.image) }
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
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => {}}
                                    disabled={urlFallback !== ''}
                                >
                                    <CheckIcon />
                                </IconButton>
                            )
                        }}
                    />
                ) : null
            }
        </>
    )
}

export default PizzaImage