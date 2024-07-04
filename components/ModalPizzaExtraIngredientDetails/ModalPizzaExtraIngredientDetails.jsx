import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '500px',
        md: '750px'
    },
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 4,
        md: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
}

function ModalPizzaExtraIngredientDetails({ openExtraIngredientDetails, handleOpenExtraIngredientDetails, extraIngredientSelected }) {

    const [extraIngredient, setExtraIngredient] = useState(extraIngredientSelected)

    return (
        <Modal
            open={openExtraIngredientDetails}
            onClose={() => {handleOpenExtraIngredientDetails(false)}}
        >
            <Box
                sx={style}
            >
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            height: 'fit-content',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component={'h1'} variant='encabezado' sx={{ fontSize: '2.0rem' }}>
                            {extraIngredient.name} Nº{extraIngredient.id}
                        </Typography>
                    </Grid>
                    
                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Nombre:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center' }}>
                        <InputUpdate
                            value={extraIngredient.name}
                            updateProperty={null}
                            properties={null}
                            updateState={null}
                            sx={{
                                width: '160px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    
                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Precio:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <InputUpdate
                            value={extraIngredient.price}
                            updateProperty={null}
                            properties={null}
                            updateState={null}
                            sx={{
                                width: '160px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Precio al público:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                        <TextField
                            value={extraIngredient.totalPrice}
                            disabled
                            sx={{
                                width: '160px'
                            }}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography>Cantidad en inventario:</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <InputUpdate
                            value={'infinity'}
                            updateProperty={null}
                            properties={null}
                            updateState={null}
                            sx={{
                                width: '160px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ModalPizzaExtraIngredientDetails