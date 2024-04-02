'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PizzaImage from './PizzaImage'
import PizzaText from './PizzaText'
import PizzaIngredients from './PizzaIngredients'
import PizzaCharacteristics from './PizzaCharacteristics'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalPizzaDetails({ openPizzaDetail, handleOpenPizzaDetail, currentPizza }) {

    return (
        <Modal
            open={ openPizzaDetail }
            onClose={() => {handleOpenPizzaDetail(false)}}
        >
            <Grid
                container
                sx={style}
                alignItems={'stretch'}
            >
                <Typography
                    variant='title'
                    gutterBottom
                >
                    {`Pizza ${currentPizza.name} Nº ${currentPizza.id}`}
                </Typography>
                <Box
                    sx={{
                        height: '90%',
                        width: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '16px',
                        pr: '8px',
                        boxSizing: 'border-box'
                    }}
                >
                    <PizzaImage pizza={currentPizza} />

                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaText text={currentPizza.text} />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaIngredients ingredients={currentPizza.ingredients} />
                    
                    <Divider sx={{ width: '100%'}} />
                    
                    <PizzaCharacteristics sizes={currentPizza.size} />

                </Box>                
            </Grid>
        </Modal> 
    )
}

export default ModalPizzaDetails