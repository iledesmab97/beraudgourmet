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

import ModalStoreDetailAdmin from '@/components/ModalStoreDetailAdmin/ModalStoreDetailAdmin'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'

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
            // pizzaNew.current = false
        }
    }

    return (
        <Box
            sx={{
                height: '70%'
            }}
        >
            <TableContainer
                component={Paper}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Coordenadas</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acción</TableCell>
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
            </Menu>
            {
                currentStore ? <ModalStoreDetailAdmin openStoreDetails={openStoreDetails} handleOpenStoreDetail={handleOpenStoreDetail} currentStore={currentStore} /> : null
            }
        </Box>
    )
}

export default TableStores