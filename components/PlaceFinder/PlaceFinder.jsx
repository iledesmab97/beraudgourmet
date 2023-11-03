'use client'

// import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useJsApiLoader, Autocomplete, GoogleMap } from '@react-google-maps/api';

const setups = {
    // googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY2,
    googleMapsApiKey: 'AIzaSyBypEW2ANDQ1OXtY4_uKZjjaOTwhM2dhkU',
    libraries: ['places']
}

const beraudGourmetPlace = { lat: 19.4307, lng: -99.2385 }

export default function PlaceFinder() {

    const { isLoaded } = useJsApiLoader(setups)

    return (
        <>
            <Box sx={{ width: '100%'}}>
                {
                    isLoaded
                    ? (
                        <>
                            <Autocomplete>
                                <TextField
                                    id="location"
                                    label="Dirección"
                                    type='text'
                                    size='small'
                                    margin='dense'
                                    fullWidth
                                    placeholder='Buscar dirección'
                                    error={false}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Autocomplete>
                            <GoogleMap
                                center={beraudGourmetPlace}
                                zoom={15}
                                mapContainerStyle={{ width: '100%', height: '500px'}}
                            />
                        </>
                    )
                    : null
                }
            </Box>
            {/* <Box sx={{ width: '100%' }}>
            </Box> */}
        </>
    )
}