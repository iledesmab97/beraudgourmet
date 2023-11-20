'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search';
import PlaceFinder from '../PlaceFinder/PlaceFinder';
import FormModalDeliveryPlace from '../ModalDeliveryPlace/FormModalDeliveryPlace'

export default function HomeDelivery({
    handleInputsAddress,
    inputsHome,
    place,
    withinLimitSaved,
    changeWithinLimitSaved,
    distanceSaved,
    handleDistanceSaved,
    handleInputsHome,
    handlePlaceType
}) {

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxHeight: '430px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2,
                    overflow: 'scroll',
                    pr: 1
                }}
            >    
                <Typography
                    variant='title'
                    sx={{
                    alignSelf: 'flex-start'
                    }}
                >
                    DIRECCIÓN DE ENTREGA
                </Typography>

                <PlaceFinder
                    changeWithinLimitSaved={changeWithinLimitSaved}
                    withinLimitSaved={withinLimitSaved}
                    handleInputsAddress={handleInputsAddress}
                    inputAddress={inputsHome.inputAddress}
                    distanceSaved={distanceSaved}
                    handleDistanceSaved={handleDistanceSaved}
                />
                {
                    withinLimitSaved
                        ? <FormModalDeliveryPlace
                            inputsHome={inputsHome}
                            place={place}
                            handleInputsHome={handleInputsHome}
                            handlePlaceType={handlePlaceType}
                        />
                        : null
                }
            </Box>
        </>
    )
}