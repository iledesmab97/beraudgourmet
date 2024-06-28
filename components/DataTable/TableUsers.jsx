import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import ModalUserDetail from '@/components/ModalUserDetail/ModalUserDetail'
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'
import Searcher from '@/components/Searcher/Searcher'
import HelperMessageToSearch from '@/components/HelperMessageToSearch/HelperMessageToSearch'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { getAllUsers, updateAccount } from '@/services/userApi'

const tabelHeader = [
    'Estado',
    'ID',
    'Nombre',
    'Email',
    'Teléfono',
    'Rol',
    'Acción'
]

function TableUsers() {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const openMenu = Boolean(anchorElMenu)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    function handleChangeUsers(userList) {
        setUsers(userList)
    }

    function closeMenu() {
        setAnchorElMenu(null)
    }

    function handleClickButtonAction(event, user) {
        setAnchorElMenu(event.currentTarget)
        setCurrentUser(user)
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
        const lastState = currentUser.state
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
            getAllUsers().then(data => handleChangeUsers(data))
            return console.log(`Usuario ${lastState === 'ACTIVE' ? 'desactivado' : 'activado'}`)
        }
        console.log(`No se ha podido ${lastState === 'ACTIVE' ? 'desactivar' : 'activar'} el usuario`)
    }

    function handleChangePage(newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function archiveUser() {
        console.log('voy a archivar al usuario:', currentUser)
    }

    return (
        <Paper
            sx={{
                position: 'relative',
                // overflowY: 'hidden',
                mt: {
                    xs: '70px',
                    sm: '0px'
                }
            }}
        >
            <TableContainer
                sx={{
                    height: '500px',
                }}
            >
                <Table
                    stickyHeader
                    size={ rowsPerPage > 60 ? 'small' : 'medium'}
                >
                    <TableHead>
                        <TableRow>
                            {
                                tabelHeader.map(label => (
                                    <TableCell
                                        key={label}
                                        sx={{
                                            bgcolor: 'rgb(98, 110, 122)',
                                            color: 'white',
                                            fontSize: '0.975rem'
                                        }}
                                    >
                                        {label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                <TableRow
                                    key={user.name}
                                    sx={{
                                        bgcolor: index % 2 !== 0 ? 'rgba(0, 0, 0, 0.04)' : '',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => { handleChangePage(newPage) }}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={'Filas por página'}
                ActionsComponent={TablePaginationActions}
            />
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
                <MenuItem
                    onClick={archiveUser}
                >
                    { 'Archivar' }
                </MenuItem>
            </Menu>
            {
                currentUser ? <ModalUserDetail openModal={openModal} handleOpenModal={handleOpenModal} currentUser={currentUser} updateUserTable={updateUserTable} /> : null
            }
            <Searcher
                handleChangelist={handleChangeUsers}
                makeRequest={getAllUsers}
                propertiesToSearch={['name', 'email', 'phoneNumber']}
                sx={{
                    position: 'absolute',
                    bottom : '100%',
                    right: '0px',
                    m: 2
                }}
            />
            {
                users.length === 0 ? (
                    <HelperMessageToSearch
                        text={'Busca algún elemento desde la barra del buscador'}
                        sx={{
                            position: 'absolute',
                            top : '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ) : null
            }
        </Paper>
    )
}

export default TableUsers