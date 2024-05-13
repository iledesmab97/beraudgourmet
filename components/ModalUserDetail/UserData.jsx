import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch';

import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import InputPhoneNumber from '@/components/InputPhoneNumber/InputPhoneNumber'

import { useState, useEffect } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateAccount } from '@/services/userApi'
import { getAllRoles } from '@/services/rolesApi'

const RolsES = {
    client: 'Cliente',
    root: 'Dueño',
    admin: 'Administrador'
}



function UserData({ user, errors, updateUserTable, handleChangeUser }) {

    const [editingNumberPhone, setEditingNumberPhone] = useState(false)
    const [loading, setLoading] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [editRole, setEditRole] = useState(false)
    const [currentRole, setCurrentRole] = useState( roleList.length ? user.Role : '')
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    useEffect(() => {
        getAllRoles()
            .then(data => {
                setRoleList(data.filter(role => role.id !== 1))
            })
    }, [])

    useEffect(() => {
        setCurrentRole(user.Role)
    }, [roleList])

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

    async function handleChangeEditRole({property}) {
        setLoading(true)
        if (!editRole) {
            setLoading(false)
            return setEditRole(prevState => !prevState)
        }
        const newRole = roleList.find(role => role.name === currentRole)
        console.log('Eviando datos...')
        const response = await updateAccount( user.id, {property, value: newRole.id})
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
                property: 'Role',
                value: newRole.name
            })
            console.log('Información guardada con exito')
        }
        setLoading(false)
        setEditRole(prevState => !prevState)
    }

    function handleChangeSelectRole(event) {
        setCurrentRole(event.target.value)
    }

    async function updateUser({propertyBack, propertyFront, value}) {
        setLoading(true)
        console.log('Eviando datos...')
        const response = await updateAccount( user.id, {property: propertyBack, value})
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
                property: propertyFront,
                value
            })
            console.log('Información guardada con exito')
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
                <Grid
                    item
                    xs={5}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
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
                <Grid
                    item
                    xs={5}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
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
                <Grid
                    item
                    xs={5}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={user.verified}
                                    onChange={() => {updateUser({propertyBack: 'verified', propertyFront: 'verified', value: !user.verified})}}
                                />
                            }
                            label={user.verified ? 'Sí' : 'No'}
                            disabled={loading}
                            sx={{
                                m: '0px',
                                width: 'fit-content'
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{width: '100%'}}/>
            </Grid>
            <Grid item container xs={12} justifyContent={'space-around'}>
                <Grid item xs={3}>
                    <Typography>Rol:</Typography>
                </Grid>
                <Grid
                    item
                    xs={5}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '16px'
                    }}
                >
                    {
                        roleList.length ? (
                            <>
                                <FormControl>
                                    <InputLabel>Rol</InputLabel>
                                    <Select
                                        value={ currentRole }
                                        label={'Rol'}
                                        onChange={handleChangeSelectRole}
                                        disabled={!editRole}
                                    >
                                        {
                                            roleList.map(role => (
                                                <MenuItem key={role.name + role.id} value={role.name}>{RolsES[role.name]}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <IconButton
                                    onClick={() => {handleChangeEditRole({property: 'RoleId'})}}
                                    disabled={loading}
                                >
                                    {
                                        editRole ? (
                                            <CheckIcon />
                                        ) : (
                                            <EditIcon />
                                        )
                                    }
                                </IconButton>
                            </>
                        ) : null
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserData