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
    typeLocation,
    withinLimitSaved,
    changeWithinLimitSaved,
    distanceSaved,
    closerStore,
    handleDistanceSaved,
    handleInputsHome,
    handleTypeLocation,
    handleCloserStore
}) {

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    maxHeight: {
                        xs: '335px',
                        sm: '490px',
                        md: '430px'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2,
                    overflowY: 'auto',
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
                    closerStore={closerStore}
                    handleDistanceSaved={handleDistanceSaved}
                    handleCloserStore={handleCloserStore}
                />
                {
                    withinLimitSaved
                        ? <FormModalDeliveryPlace
                            inputsHome={inputsHome}
                            typeLocation={typeLocation}
                            closerStore={closerStore}
                            handleInputsHome={handleInputsHome}
                            handleTypeLocation={handleTypeLocation}
                            currentModal='place'
                        />
                        : null
                }
            </Box>
        </>
    )
}