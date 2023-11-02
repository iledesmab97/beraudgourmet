'use client'

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import TextArea from '../TextArea/TextArea'

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

    function handlePlace (event) {
        setPlace(places[event.target.value])
    }

    return (
        <Grid container spacing={2}>
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
                        sx={{
                            width: '70%'
                        }}
                    />
                    <TextField
                        id='input-unidad'
                        variant='outlined'
                        placeholder={place.city.postal}
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
                        maxRows={7}
                        // placeholder='Minimun 3 rows'
                        aria-label='minimum height'
                    />
                </Grid>
            </Grid>
        </Grid>
    )
} 