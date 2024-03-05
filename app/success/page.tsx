'use client'

import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { saveModal } from '@/utils/modal'

import styles from './page.module.css'

function SuccessPay() {

    const router = useRouter()

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
                <Box className={styles.containerTitles}>
                    <h1 className={styles.PrimaryTitle}>Compra exitosa</h1>
                    <h3>Gracias por elegirnos</h3>
                </Box>
                <Button
                    variant='contained'
                    onClick={() => {
                        saveModal('userOrders')
                        router.push('/menu')
                    }}
                >
                    Ver historial de compras
                </Button>
            </Box>
        </Grid>
    )
}

export default SuccessPay