import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState, useEffect } from 'react'

import { getAllUsers } from '@/services/userApi'
import { phoneNumber } from '@/utils/contact'

function UserData({user}) {

    const [userSelected, setUserSelected] = useState(user)
    const [inputValue, setInputValue] = useState({
        id: user.id ? String(user.id) : '',
        name: user.name ? user.name : '',
        phoneNumber: user.phoneNumber ? user.phoneNumber : ''
    })
    const [editing, setEditing] = useState({
        id: false,
        name: false,
        phoneNumber: false
    })
    const [userList, setUserList] = useState([])

    useEffect(() => {
        getAllUsers('all')
            .then(data => {
                if (data.message) throw new Error(data.message)
                    setUserList(data)
            })
            .catch(error => alert(error.message))
    }, [])

    function handleEditing(property) {
        let newEditing = {...editing}
        for (let prop in newEditing) {
            if (prop === property) {
                newEditing[prop] = !newEditing[prop]
                continue
            }
            newEditing[prop] = false
        }
        setEditing(newEditing)
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

    return (
        <>
            <Typography variant='title'>USUAIRO</Typography>
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
                        disabled={!editing.id}
                    />
                    <IconButton
                        onClick={() => {handleEditing('id')}}
                    >
                        {
                            editing.id ? (
                                <CheckIcon />
                            ) : (
                                <EditIcon />
                            )
                        }
                    </IconButton>
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
                        disabled={!editing.name}
                    />
                    <IconButton
                        onClick={() => {handleEditing('name')}}
                    >
                        {
                            editing.name ? (
                                <CheckIcon />
                            ) : (
                                <EditIcon />
                            )
                        }
                    </IconButton>
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
                        disabled={!editing.phoneNumber}
                    />
                    <IconButton
                        onClick={() => {handleEditing('phoneNumber')}}
                    >
                        {
                            editing.phoneNumber ? (
                                <CheckIcon />
                            ) : (
                                <EditIcon />
                            )
                        }
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default UserData