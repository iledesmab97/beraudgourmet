import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import UserData from './UserData'
import OrdersUser from './OrdersUser'

import { useState, useEffect } from 'react'

import { isPossiblePhoneNumber } from 'libphonenumber-js'

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const validNombre=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/

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
    height: {
        xs: '80%',
        md: '700px'
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 4,
        md: 5
    },
    pb: {
        xs: 10,
        sm: 10,
        md: 10
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function validation(user) {
    const errors = {}
    if ( !user.email ) errors.email = false
    if ( user.email && !validEmail.test(user.email)) errors.email = 'Ingrese un correo válido'
    if ( user.name && !validNombre.test(user.name) ) errors.name = 'No colocar números ni caracteres especiales'
    if ( !(user.phoneNumber === undefined || user.phoneNumber === null) ) {
        const [code, place, number] = user.phoneNumber.split(" ")
        if (!code) errors.phoneNumber = 'Coloca el código del país'
        if ( place && !isPossiblePhoneNumber(user.phoneNumber)) errors.phoneNumber = 'Número de teléfono inválido'
        if (!isPossiblePhoneNumber(user.phoneNumber)) errors.phoneNumber = 'Número de teléfono inválido'
    }
    return errors
}

function ModalUserDetail({ openModal, handleOpenModal, currentUser, updateUserTable }) {

    const [user, setUser] = useState(currentUser)
    const [errors, setErrors] = useState({})
    
    function handleChangeUser({property, value}) {
        const newUser = {
            ...user,
            [property]: value
        }
        setUser(newUser)
        console.log('voy a modificar el errors ahora')
        setErrors(validation(newUser))
    }

    return (
        <Modal
            open={openModal}
            onClose={() => {handleOpenModal(false)}}
        >
            <Box
                sx={style}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        pr: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography variant='title'>
                        {user.name} Nº{user.id}
                    </Typography>
                    <UserData
                        user={user}
                        errors={errors}
                        updateUserTable={updateUserTable}
                        handleChangeUser={handleChangeUser}
                    />
                    <Divider sx={{width: '100%'}}/>
                    <OrdersUser user={user} />
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserDetail