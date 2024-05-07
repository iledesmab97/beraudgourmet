import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateAccount } from '@/services/userApi'

const RolsES = {
    client: 'Cliente',
    root: 'Dueño',
    admin: 'Administrador'
}



function UserData({ user, errors, updateUserTable, handleChangeUser }) {

    const [editingNumberPhone, setEditingNumberPhone] = useState(false)
    const [loading, setLoading] = useState(false)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function handleChangeNumberPhone(newNumberPhone) {
        handleChangeUser({property: 'phoneNumber', value: newNumberPhone})
    }

    async function handleEditing() {
        if (loading) return
        setLoading(true)

        if (editingNumberPhone) {
            if (Object.keys(errors).length) return
            setEditingNumberPhone(prevState => !prevState)
            const response = await updateAccount( user.id, {property: 'phoneNumber', value: user.phoneNumber})
            let text, status
            if (response.message) {
                text = response.message
                status = 'error'
            } else {
                text = response
                status = 'success'
            }
            handleUpdateAlertMessage({
                checked: true,
                text,
                status
            })
            if (!response.message) {
                updateUserTable({
                    id: user.id,
                    property: 'phoneNumber',
                    value: user.phoneNumber
                })
                console.log('Información guardada con exito')
            }
        } else {
            setEditingNumberPhone(prevState => !prevState)
        }
        setLoading(false)
    }

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xs={12}
                container
                justifyContent={'space-around'}
                alignItems={'center'}
            >
                <Grid item xs={3}>
                    <Typography>Nombre:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <InputUpdate
                        value={user.name}
                        updateProperty={updateAccount}
                        properties={{ property: 'name', id: user.id}}
                        updateState={updateUserTable}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item xs={12} container justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Email:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <InputUpdate
                        value={user.email}
                        updateProperty={updateAccount}
                        properties={{ property: 'email', id: user.id}}
                        updateState={updateUserTable}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item xs={12} container justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography >Teléfono:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <InputPhoneNumber
                        numberPhone={user.phoneNumber}
                        errorsNumberPhone={errors.phoneNumber}
                        userLoged={true}
                        type={'text'}
                        handleChangeNumberPhone={handleChangeNumberPhone}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    name='numberPhone'
                                    position='end'
                                    onClick={handleEditing}
                                    disabled={errors.numberPhone || loading ? true : false}    
                                >
                                    {
                                        editingNumberPhone
                                        ? <CheckIcon />
                                        : <EditIcon />
                                    }
                                </IconButton>
                            ),
                            // readOnly: !editingNumberPhone ? true : false,
                            disabled: !editingNumberPhone
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item container xs={12} justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Verificado:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography align='right'>{user.verified ? 'Sí' : 'No'}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item container xs={12} justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Rol:</Typography>
                </Grid>
                <Grid item xs={5} >
                    <Typography align='right'>{RolsES[user.Role]}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserData