'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGetOrders from '@/hooks/useGetOrders'
import useGetModal from '@/hooks/useGetModal'
import useGetPlace from '@/hooks/useGetPlace'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { saveModal } from '@/utils/modal'

import styles from './page.module.css'

function SuccessPay() {

    const router = useRouter()
    const { handleUpdateOrderToInitialState } = useGetOrders()
    const { handleUpdateModalToInitialState } = useGetModal({modalType: 'pay'})
    const { handleUpdatePlaceToInitialState } = useGetPlace()

    useEffect(() => {
        handleUpdateOrderToInitialState()
        handleUpdateModalToInitialState()
        handleUpdatePlaceToInitialState()
    }, [])

    return (
        <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            sx={{
                position: 'absolute',
                top: '30%',
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
                        router.push('/pizzas')
                    }}
                >
                    Ver historial de compras
                </Button>
            </Box>
        </Grid>
    )
}

export default SuccessPay