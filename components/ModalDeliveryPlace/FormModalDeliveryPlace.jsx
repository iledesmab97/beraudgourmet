'use client'

import { useState, useEffect } from 'react'
import useGetPlace from '@/hooks/useGetPlace'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import TextArea from '../TextArea/TextArea'
import ItemPlace from '../PlaceFinder/ItemPlace'

const places = {
    home: {
        name: 'home',
        street: [
            {
                name: 'Unidad',
                width: 20
            },
            {
                name: 'Numero',
                width: 20
            },
            {
                name: 'Nombre de la calle',
                width: 60
            }
        ],
        city: {
            postal: 'Código postal'
        }
    },
    work: {
        name: 'work',
        street: [
            {
                name: 'Numero',
                width: 25
            },
            {
                name: 'Nombre de la calle',
                width: 75
            }
        ],
        city: {
            postal: 'Código postal'
        },
        other: {
            name: 'Negocio',
            inputs: [
                {
                    name: 'Negocio',
                    width: 75
                },
                {
                    name: 'Piso',
                    width: 25
                }
            ]
        }
    },
    building: {
        name: 'building',
        street: [
            {
                name: 'Numero',
                width: 25
            },
            {
                name: 'Nombre de la calle',
                width: 75
            }
        ],
        city: {
            postal: 'Código postal'
        },
        other: {
            name: 'Edificio',
            inputs: [
                {
                    name: 'Edificio',
                    width: 75
                },
                {
                    name: 'Depto.',
                    width: 25
                }
            ]
        }
    },
    other: {
        name: 'other',
        street: [
            {
                name: 'Numero',
                width: 25
            },
            {
                name: 'Nombre de la calle',
                width: 75
            }
        ],
        city: {
            postal: 'Código postal'
        },
        other: {
            name: 'Edificio',
            inputs: [
                {
                    name: 'Edificio',
                    width: 75
                },
                {
                    name: 'Habitación',
                    width: 25
                }
            ]
        }
    }
}

export default function FormModalDeliveryPlace () {

    const [place, setPlace] = useState(places.home)
    const [inputs, setInputs] = useState({
        street: {
            ['unidad']: '',
            ['numero']: '',
            ['nombre de la calle']: ''
        },
        city: '',
        postalCode: '',
        note: ''
    })
    const { handleAddPlace } = useGetPlace()

    useEffect(() => {
        const newStreet = {}
        let newOther
        place.street.forEach(item => {
            if (inputs.street[item.name.toLowerCase()]) {
                newStreet[item.name.toLowerCase()] = inputs.street[item.name.toLowerCase()]
            } else {
                newStreet[item.name.toLowerCase()] = ''
            }
        })
        if (place.other) {
            newOther = {}
            place.other.inputs.forEach(item => {
                newOther[item.name.toLowerCase()] = ''
            })
        }
        setInputs({
            ...inputs,
            street: newStreet,
            other: newOther
        })
    }, [place])

    function handlePlace (event) {
        setPlace(places[event.target.value])
    }

    function handleInputs(event) {
        const {value, name } = event.target
        if (name === 'nombre de la calle' || name === 'numero' || name === 'unidad') {
            const newInputs = {
                ...inputs,
                street: {
                    ...inputs.street,
                    [name]: value
                }
            }
            setInputs(newInputs)
        } else if (name === 'city' || name === 'postalCode' || name === 'note') {
            const newInputs = {
                ...inputs,
                [name]: value
            }
            setInputs(newInputs)
        } else {
            const newInputs = {
                ...inputs,
                other: {
                    ...inputs.other,
                    [name]: value
                }
            }
            setInputs(newInputs)
        }
    }

    return (
        <Grid
            container
            spacing={2}
            direction='column'
        >
            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        md={3}
                        sx={{
                            pr: 3
                        }}
                    >
                        Tipo
                    </Typography>
                </Grid>
                <Grid item md>
                    <FormControl fullWidth>
                        <InputLabel id='type-place-label'>Tipo de residencia</InputLabel>
                        <Select
                            labelId='type-place'
                            id='type-place-select'
                            value={place.name}
                            label='Tipo de residencia'
                            onChange={handlePlace}
                        >
                            <MenuItem value='home'>Casa: Dirección residencial</MenuItem>
                            <MenuItem value='work'>Trabajo: Dirección comercial</MenuItem>
                            <MenuItem value='building'>Casa: Departament</MenuItem>
                            <MenuItem value='other'>Hotel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {
                place.other
                    ? (
                        <Grid container item alignItems='center'>
                            <Grid item md={3}>    
                                <Typography
                                    id="modal-modal-title"
                                    variant='p'
                                    component="h2"
                                    align='right'
                                    sx={{
                                        pr: 3
                                    }}
                                >
                                    {place.other.name}
                                </Typography>
                            </Grid>

                            {
                                place.other && (
                                    <Grid item md>
                                        {
                                            place.other.inputs.map(input => (
                                                <TextField
                                                    id='input-unidad'
                                                    variant='outlined'
                                                    placeholder={input.name}
                                                    key={input.name}
                                                    name={input.name.toLowerCase()}
                                                    onChange={handleInputs}
                                                    sx={{
                                                        width: `${input.width}%`
                                                    }}
                                                />        
                                            ))
                                        }
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                    : null
            }


            <Grid container item alignItems='center'>
                <Grid item md={3}>    
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Calle
                    </Typography>
                </Grid>

                <Grid item md>
                    {
                        place.street.map(input => (
                            <TextField
                                id='input-unidad'
                                variant='outlined'
                                placeholder={input.name}
                                name={input.name.toLowerCase()}
                                onChange={handleInputs}
                                sx={{
                                    width: `${input.width}%`
                                }}
                                key={input.name}
                            />
                        ))
                    }
                </Grid>
            </Grid>

            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Pueblo/Ciudad
                    </Typography>
                </Grid>

                <Grid item md>
                    <TextField
                        id='input-unidad'
                        variant='outlined'
                        name='city'
                        onChange={handleInputs}
                        sx={{
                            width: '70%'
                        }}
                    />
                    <TextField
                        id='input-unidad'
                        variant='outlined'
                        placeholder={place.city.postal}
                        name='postalCode'
                        onChange={handleInputs}
                        sx={{
                            width: '30%'
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Nota
                    </Typography>
                </Grid>

                <Grid item md>
                    <TextArea
                        minRows={3}
                        maxRows={3}
                        // placeholder='Minimun 3 rows'
                        aria-label='minimum height'
                        onChange={handleInputs}
                        name='note'
                    />
                </Grid>
            </Grid>
            <Button
                variant='contained'
                onClick={() => handleAddPlace(inputs)}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 40,
                    alignSelf: 'flex-end',
                    mt: 2
                }}
            >Agregar</Button>
        </Grid>
    )
} 