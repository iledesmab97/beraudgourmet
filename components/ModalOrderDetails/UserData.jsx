import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState, useEffect } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { getAllUsers } from '@/services/userApi'
import { updateOrder } from '@/services/orderApi'

function UserData({user, currentOrder, handleUpdateOrderProperty}) {

    const [userSelected, setUserSelected] = useState(user)
    const [inputValue, setInputValue] = useState({
        id: user.id ? String(user.id) : '',
        name: user.name ? user.name : '',
        phoneNumber: user.phoneNumber ? user.phoneNumber : ''
    })
    const [editing, setEditing] = useState(false)
    const [userList, setUserList] = useState([])
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    useEffect(() => {
        getAllUsers('all')
            .then(data => {
                if (data.message) throw new Error(data.message)
                    setUserList(data)
            })
            .catch(error => alert(error.message))
    }, [])

    async function handleEditing() {
        if (editing && userSelected.id !== user.id) {
            const response = await updateDataUser()
            if (response.message) return
        }
        setEditing(prevState => !prevState)
    }

    function handleChangeUserSelected({ property, value }) {
        let newUser = {}
        if (value === null) return
        if ( property === undefined || value === undefined ) return
        if ( !['id', 'name', 'phoneNumber'].includes(property) ) return
        newUser = userList.find(user => {
            if (property === 'id') {
                return user[property] === Number(value)
            } else if ( property === 'name' || property === 'phoneNumber' ) {
                return user[property] === value
            }
        })
        setUserSelected(newUser)
    }

    function handleChangeInputUserValue({ property, value }) {
        if ( property === undefined || value === undefined ) return
        if ( !['id', 'name', 'phoneNumber'].includes(property) ) return
        const newInputValue = {
            ...inputValue,
            [property]: value
        }
        setInputValue(newInputValue)
    }

    async function updateDataUser() {
        console.log('Actualizando información...')
        const response = await updateOrder( currentOrder.id, { property: 'UserId', value: userSelected.id })
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
                handleUpdateOrderProperty({
                    id: currentOrder.id,
                    property: 'user',
                    value: {
                        id: userSelected.id,
                        name: userSelected.name,
                        phoneNumber: userSelected.phoneNumber
                    }
                })
                console.log('Información guardada con exito')
            } else {
                console.log('No se ha guardado la información exitosamente')
            }
            return response
    }

    return (
        <>
            <Typography variant='title'>USUARIO</Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    {`ID:`}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Autocomplete
                        value={userSelected.id ? String(userSelected.id) : null}
                        onChange={(event, id) => {handleChangeUserSelected({property: 'id', value: id})}}
                        inputValue={inputValue.id}
                        onInputChange={(event, id) => {handleChangeInputUserValue({property: 'id', value: id})}}
                        options={userList.map(user => String(user.id))}
                        sx={{ width: '125px' }}
                        renderInput={(params) => {
                            return <TextField {...params} />
                        }}
                        disabled={!editing}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Cliente:
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Autocomplete
                        value={userSelected.name ? userSelected.name : null}
                        onChange={(event, name) => {handleChangeUserSelected({property: 'name', value: name})}}
                        inputValue={inputValue.name}
                        onInputChange={(event, name) => {handleChangeInputUserValue({property: 'name', value: name})}}
                        options={userList.map(user => user.name)}
                        sx={{ width: '150px' }}
                        renderInput={(params) => {
                            return <TextField {...params} />
                        }}
                        disabled={!editing}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='p'
                    gutterBottom
                >
                    Teléfono
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Autocomplete
                        value={userSelected.phoneNumber ? userSelected.phoneNumber : null}
                        onChange={(event, phoneNumber) => {handleChangeUserSelected({property: 'phoneNumber', value: phoneNumber})}}
                        inputValue={inputValue.phoneNumber}
                        onInputChange={(event, phoneNumber) => {handleChangeInputUserValue({property: 'phoneNumber', value: phoneNumber})}}
                        options={userList.filter(user => user.phoneNumber).map(user => user.phoneNumber)}
                        sx={{ width: '200px' }}
                        renderInput={(params) => {
                            return <TextField {...params} />
                        }}
                        disabled={!editing}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <IconButton
                    onClick={handleEditing}
                >
                    {
                        editing ? (
                            <CheckIcon />
                        ) : (
                            <EditIcon />
                        )
                    }
                </IconButton>
            </Box>
        </>
    )
}

export default UserData