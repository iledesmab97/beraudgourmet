'use client'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import styles from './page.module.css'

function SuccessPay() {
    return (
        <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            sx={{
                // bgcolor: 'green',
                py: '5%'
            }}
        >
            <Box
                className={styles.containerPrimaryTitle}
            >
                <ShoppingCartIcon/>
                <h1 className={styles.PrimaryTitle}>Compra exitosa</h1>
                <h3>Gracias por elegirnos</h3>
            </Box>
        </Grid>
    )
}

export default SuccessPay