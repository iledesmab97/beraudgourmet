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

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ModalStoreDetailAdmin from '@/components/ModalStoreDetailAdmin/ModalStoreDetailAdmin'
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'

const columns = ['ID', 'Nombre', 'Ciudad', 'Coordenadas', 'Teléfono', 'Acción']

function listStores(storeList) {
    const arrayStoreList = []
    if (Object.keys(storeList).length) {
        for (let city in storeList) {
            storeList[city].stores.forEach(store => {
                const newStore = {
                    ...store,
                    city
                }
                arrayStoreList.push(newStore)
            })
        }
    }
    return arrayStoreList
}

function TableStores() {

    const { storeList, handleAddStoreList } = useGetStoreList()
    const [ storeListArray, setStoreListArray ] = useState(listStores(storeList))
    const [currentStore, setCurrentStore] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [openStoreDetails, setOpenStoreDetails] = useState(false)
    const openMenu = Boolean(anchorElMenu)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    function toggleMenu() {
        setAnchorElMenu(null)
    }

    useEffect(() => {
        if (Object.keys(storeList).length) {
            setStoreListArray(listStores(storeList))
        }
    }, [storeList])

    function handleClickButtonAction(event, store) {
        setAnchorElMenu(event.currentTarget)
        setCurrentStore(store)
    }

    function handleOpenStoreDetail(value) {
        setOpenStoreDetails(value)
        toggleMenu()
        if (!value) {
            setCurrentStore(null)
        }
    }

    function handleChangePage(newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper>
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
                                columns.map(label => (
                                    <TableCell
                                        key={label}
                                        align='center'
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
                            storeListArray.map(store => (
                                <TableRow key={store.name}>
                                    <TableCell>{store.id}</TableCell>
                                    <TableCell>{store.name}</TableCell>
                                    <TableCell>{store.city}</TableCell>
                                    <TableCell>{store.place}</TableCell>
                                    <TableCell>{store.phone}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => handleClickButtonAction(event, store)}
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
                count={storeListArray.length}
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
                onClose={toggleMenu}
            >
                <MenuItem
                    onClick={() => {handleOpenStoreDetail(true)}}
                >
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    // onClick={() => {handleOpenStoreDetail(true)}}
                >
                    Eliminar
                </MenuItem>
            </Menu>
            {
                currentStore ? <ModalStoreDetailAdmin openStoreDetails={openStoreDetails} handleOpenStoreDetail={handleOpenStoreDetail} currentStore={currentStore} /> : null
            }
        </Paper>
    )
}

export default TableStores