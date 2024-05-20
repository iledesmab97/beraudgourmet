import Box from '@mui/material/Box'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import IconButton from '@mui/material/IconButton'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import ModalUserDetail from '@/components/ModalUserDetail/ModalUserDetail'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { getAllUsers, updateAccount } from '@/services/userApi'

// function listStores(storeList) {
//     const arrayStoreList = []
//     if (Object.keys(storeList).length) {
//         for (let city in storeList) {
//             storeList[city].stores.forEach(store => {
//                 const newStore = {
//                     ...store,
//                     city
//                 }
//                 arrayStoreList.push(newStore)
//             })
//         }
//     }
//     return arrayStoreList
// }

function TableUsers({ users, handleChangeUsers }) {

    // const { storeList, handleAddStoreList } = useGetStoreList()
    // const [ storeListArray, setStoreListArray ] = useState(listStores(storeList))
    const [currentUser, setCurrentUser] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const openMenu = Boolean(anchorElMenu)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    function closeMenu() {
        setAnchorElMenu(null)
    }

    // useEffect(() => {
    //     if (Object.keys(storeList).length) {
    //         setStoreListArray(listStores(storeList))
    //     }
    // }, [storeList])

    function handleClickButtonAction(event, store) {
        setAnchorElMenu(event.currentTarget)
        setCurrentUser(store)
    }

    function handleOpenModal(value) {
        setOpenModal(value)
        closeMenu()
        if (!value) {
            setCurrentUser(null)
        }
    }

    function updateUserTable({ id, property, value}) {
        const newUsers = [...users]
        let indexUser
        const userToUpdate = newUsers.find((user, index) => {
            if (user.id === id) {
                indexUser = index
                return true
            }
        })
        userToUpdate[property] = value
        newUsers[indexUser] = userToUpdate
        handleChangeUsers(newUsers)
    }

    async function handleStatusUser() {
        closeMenu()
        const properties = {
            property: 'state',
            value: currentUser.state === 'ACTIVE' ? 'DESACTIVE' : 'ACTIVE'
        }
        const response = await updateAccount(currentUser.id, properties)
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
            getAllUsers()
                .then(data => handleChangeUsers(data))
        }
    }

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    height: '100%'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Estado</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.name}>
                                    <TableCell align='center'>{
                                        user.state === 'ACTIVE' ? (
                                            <CheckCircleIcon sx={{ color: '#4caf50'}} />
                                        ) : (
                                            <CancelIcon sx={{ color: '#f6685e'}} />
                                        )
                                    }</TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.Role}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => handleClickButtonAction(event, user)}
                                        >
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={closeMenu}
            >
                <MenuItem
                    onClick={() => {handleOpenModal(true)}}
                >
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    onClick={handleStatusUser}
                >
                    { currentUser?.state === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                </MenuItem>
            </Menu>
            {
                currentUser ? <ModalUserDetail openModal={openModal} handleOpenModal={handleOpenModal} currentUser={currentUser} updateUserTable={updateUserTable} /> : null
            }
        </>
    )
}

export default TableUsers