'use client'

import OrdersTablet from './OrdersTablet'
import OrdersList from './OrdersList'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useState, useEffect } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

import { getAllOrders } from '@/services/orderApi'
import { extractIngredientsOut } from '@/utils/preparingData'

import styles from './ModalUserOrders.module.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '700px'
    },
    height: {
        xs: '80%',
        sm: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center'
}

function ModalUserOrders() {

    const { open, handleChangeModal } = useGetModal({ modalType: 'userOrders' })
    const { user } = useGetUser()
    const [ orders, setOrders ] = useState([])
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {
        if (!user.id) return
        getAllOrders(user.id).then( data => {
            if (data.message) return alert(data.message)
            return setOrders(data)
        } )
    }, [open])

    return (
        <Modal
            open={open}
            onClose={() => {
                handleChangeModal('userOrders', 'user')
                localStorage.removeItem('modalToOpen')
            }}
        >
            <Box
                sx={style}
            >
                <Typography
                    variant='title'
                    sx={{
                        // flexGrow: 1,
                        mb: 3
                    }}
                    align='center'
                >
                    Historial de Ordenes
                </Typography>
                {
                    isLargeScreen ? <OrdersTablet orders={orders} /> : <OrdersList orders={orders} />
                }
            </Box>
        </Modal>
    )
}

export default ModalUserOrders