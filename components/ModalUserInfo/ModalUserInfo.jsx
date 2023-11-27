'use client'

import { useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'
import { accept } from '@/genericFunctions/modal'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 2,
  };

function ModalUserInfo() {

    // const [open, setOpen] = useState(false)
    const {open, handleCloseModalUser} = useGetModal({modalType: 'user'})
    const { handleRemoveUser } = useGetUser()

    return (
        <Modal
            open={open}
            onClose={handleCloseModalUser}
        >
            <Box sx={style}>
                <Button
                    onClick={ () => {accept({action: handleRemoveUser}, handleCloseModalUser)}}
                >
                    Cerrar Cesión
                </Button>
            </Box>

        </Modal>        
    )
}

export default ModalUserInfo