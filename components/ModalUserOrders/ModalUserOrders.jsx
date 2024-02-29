'use client'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import useGetModal from '@/hooks/useGetModal'

import styles from './ModalUserOrders.module.css'


function ModalUserOrders() {

    const { open, handleChangeModal } = useGetModal({ modalType: 'userOrders' })

    return (
        <Modal
            open={open}
            onClose={() => { handleChangeModal('userOrders', 'user') }}
        >
            <Box
                className={styles.ModalUserOrdersContainer}
                sx={{ bgcolor: 'background.paper' }}
            >
                Estoy en el modal de las ordenes de los usuarios
            </Box>
        </Modal>
    )
}

export default ModalUserOrders