'use client'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import UserLoged from '../OrderRewards/UserLoged'
import MoveDown from '@/components/MoveDown/MoveDown'

import useGetModal from '@/hooks/useGetModal'
import useGetUser from '@/hooks/useGetUser'
import useHandleUser from '@/hooks/useHandleUser'
import useHandleSession from '@/hooks/useHandleSession'

import { requestVerification } from '@/services/userApi'

import styles from '@/components/MoveDown/MoveDown.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '324px',
        sm: '400px'
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
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    overflowY: 'auto'
  };

function ModalUserInfo() {

    const {open, handleCloseModal, handleChangeModal} = useGetModal({modalType: 'user'})
    const { handleRemoveUser } = useGetUser()
    const { inputs, errors, handleChange, userLoged, user, editing, handleChangeNumberPhone, signOff, handleEditing} = useHandleUser()
    const { closeSession } = useHandleSession()

    async function sendVerification() {
        const response = await requestVerification({email: user.email})
        if (response.message) return alert(response.message)
    }

    return (
        <Modal
            open={open}
            onClose={() => { handleCloseModal('user') }}
        >
            <Grid
                id={'ModalUserInfor-container'}
                container
                sx={style}
                alignItems={'stretch'}
                wrap='nowrap'
            >
                <Typography
                    variant='title'
                    gutterBottom
                >
                    Su cuenta
                </Typography>
                <UserLoged
                    userLoged={userLoged}
                    inputs={inputs}
                    errors={errors}
                    handleChange={handleChange}
                    handleChangeNumberPhone={handleChangeNumberPhone}
                    type={'text'}
                    editing={editing}
                    handleEditing={handleEditing}
                    open={open}
                />
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItmens: 'center'
                    }}
                >
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        ¿Le gustaría recibir correos electrónicos promocionales?
                    </Typography>
                    <RadioGroup
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <FormControlLabel
                            value='y'
                            control={<Radio />}
                            label='Sí'
                            sx={{
                                width: 'fit-content'
                            }}
                        />
                        <FormControlLabel
                            value='n'
                            control={<Radio />}
                            label='No'
                            sx={{
                                width: 'fit-content'
                            }}
                        />
                    </RadioGroup>
                </Grid>
                <Grid
                    item
                    sx={{
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onClick={() => { handleChangeModal('user', 'changePassword') }}
                    >
                        Cambiar su contraseña
                    </Button>
                    <Button
                        onClick={() => { handleChangeModal('user', 'changeEmail') }}
                    >
                        ¿Cambiar de correo electrónico?
                    </Button>
                    <Button
                        onClick={ () => { handleChangeModal('user', 'userOrders') }}
                    >
                        Ver historial de ordenes
                    </Button>
                    <Button
                        onClick={ () => {}}
                    >
                        Borrar mi cuenta
                    </Button>
                    {
                        !user.verified ? (
                            <Button
                                onClick={ () => {sendVerification()}}
                            >
                                Verificar mi correo electrónico
                            </Button>
                        ) : null
                    }
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant='p'
                        gutterBottom
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        {user.email}
                    </Typography>
                    <Button
                        id={'button-cerrar-sesion'}
                        onClick={ () => {
                            signOff()
                            closeSession()
                            handleCloseModal('user')
                        }}
                    >
                        Cerrar Sesión
                    </Button>
                </Grid>
                <MoveDown
                    sectionToGo={'#button-cerrar-sesion'}
                    containerId={ '#ModalUserInfor-container' }
                    className={styles.buttonMoveDown2}
                />
            </Grid>

        </Modal>        
    )
}

export default ModalUserInfo