'use client'

import Image from 'next/image'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ModalPizzaDetail from '@/components/ModalPizzaDetails/ModalPizzaDetails'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import TablePagination from '@mui/material/TablePagination'

import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'

import { useState, useRef, useEffect } from 'react';
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import useGetProducts from '@/hooks/useGetProducts'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { updateOrder, getAllOrders, sendImage } from '@/services/orderApi'
import { getPizzas, getPizzaCosts, removePizza, updatePizza } from '@/services/productApi'
import { howMuchLeft } from '@/utils/hours'

import styles from './DataTable.module.css'

const tableHeaders = {
    salads: [ 'Estatus','Nombre', 'Ingredientes', 'Imagen', 'Acción' ]
}

const colorsCell = {
    late: 'red',
    today: '#D99914',
    early: 'green'
}

function TableSalads() {

    const [anchorEl, setAnchorEl] = useState(null)
    const [currentSalad, setCurrentSalad] = useState(null)
    const [openSaladDetail, setOpenSaladDetail] = useState(false)
    const open = Boolean(anchorEl)
    const { products, handleAddProductsList, handleUpdateProduct, handleDeleteProduct } = useGetProducts({type:'salads'})
    const [salads, setSalads] = useState( products ? products : [])
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const saladNew = useRef(false)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [totalMatches, setTotalMatches] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        if (products) setSalads(products)
    }, [products])

    useEffect(() => {
        if (!saladNew.current) return
        setOpenSaladDetail(true)
    }, [currentSalad])

    useEffect(() => {
        setTotalMatches(matches)
    }, [matches])

    function handleOpenPizzaDetail(value) {
        setOpenSaladDetail(value)
        handleCloseMenu()
        if (!value) {
            setCurrentSalad(null)
            saladNew.current = false
        }
    }

    function handleClickButtonAction(event, pizza) {
        setAnchorEl(event.currentTarget)
        setCurrentSalad(pizza)
    }

    function handleCloseMenu() {
        setAnchorEl(null)
    }

    // async function handleRemovePizza() {
    //     const response = await removePizza(currentSalad.id)
    //     let text, status
    //     if (response.message) {
    //         text = response.message
    //         status = 'error'
    //     } else {
    //         text = response
    //         status = 'success'
    //     }
    //     handleUpdateAlertMessage({
    //         checked: true,
    //         text,
    //         status
    //     })
    //     if (!response.message) {
    //         handleDeleteProduct({
    //             type: 'salads',
    //             id: currentSalad.id
    //         })
    //     }
    //     handleCloseMenu()
    // }

    // function addNewPizza() {
    //     setCurrentSalad({
    //         id: 0,
    //         name: '',
    //         text: '',
    //         image: '',
    //         ingredients: [''],
    //         price: {
    //             '30cm': {
    //                 'Masa Tradicional': ''
    //             }
    //         }
    //     })
    //     saladNew.current = true
    //     handleOpenPizzaDetail(true)
    // }

    // async function handleStatusPizza() {
    //     const properties = {
    //         property: 'status',
    //         value: currentSalad.status === 'ACTIVE' ? 'DESACTIVE' : 'ACTIVE'
    //     }
    //     const response = await updatePizza(currentSalad.id, properties)
    //     let text, status
    //     if (response.message) {
    //         text = response.message
    //         status = 'error'
    //     } else {
    //         text = response
    //         status = 'success'
    //     }
    //     handleUpdateAlertMessage({
    //         checked: true,
    //         text,
    //         status
    //     })
    //     if (!response.message) {
    //         handleUpdateProduct({
    //             ...properties,
    //             type: 'salads',
    //             id: currentSalad.id
    //         })
    //     }
    //     handleCloseMenu()
    // }

    function handleChangePage(newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper
            sx={{
                position: 'relative',
                // overflowY: 'hidden',
            }}
        >
            <TableContainer
                className={styles.DataTable}
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
                                tableHeaders.salads.map(column => (
                                    <TableCell
                                        key={column}
                                        align='center'
                                        sx={{
                                            bgcolor: 'rgb(98, 110, 122)',
                                            color: 'white',
                                            fontSize: '0.975rem'
                                        }}
                                    >
                                        {column}
                                    </TableCell>
                                ))          
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.DataTableBody}>
                        {
                            salads.map((salad) => (
                                <TableRow key={salad.id}>
                                    <TableCell align='center'>{
                                        salad.status === 'ACTIVE' ? (
                                            <CheckCircleIcon sx={{ color: '#4caf50'}} />
                                        ) : (
                                            <CancelIcon sx={{ color: '#f6685e'}} />
                                        )
                                    }</TableCell>
                                    <TableCell align='center'>{salad.name}</TableCell>
                                    <TableCell align='center'>{salad.ingredients.join(', ')}</TableCell>
                                    <TableCell align='center'>
                                        {
                                            salad.image ? (
                                                <Image
                                                    src={salad.image}
                                                    alt={salad.name}
                                                    width={130}
                                                    height={100}
                                                    style={{
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            ) : null
                                        }
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={(event) => {
                                                handleClickButtonAction(event, salad)
                                            }}
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
                count={salads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => { handleChangePage(newPage) }}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={'Filas por página'}
                ActionsComponent={TablePaginationActions}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                <MenuItem
                    // onClick={handleStatusPizza}
                >
                    { currentSalad?.status ? 'Desactivar' : 'Activar'}
                </MenuItem>
                <MenuItem
                    // onClick={() => { handleOpenPizzaDetail(true) }}
                >
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    // onClick={handleRemovePizza}
                >
                    Eliminar
                </MenuItem>
            </Menu>
            {/* {
                currentSalad ? (
                    <ModalPizzaDetail openSaladDetail={openSaladDetail} handleOpenPizzaDetail={handleOpenPizzaDetail} currentSalad={currentSalad} saladNew={saladNew.current} />
                ) : null
            } */}
            {/* <Box
                sx={{
                    position: 'absolute',
                    bottom: '102%',
                    right: '16px'
                }}
            >
                {
                    !totalMatches ? (
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            onClick={addNewPizza}
                            disabled={!products}
                        >
                            Nueva Pizza
                        </Button>
                    ) : (
                        <IconButton
                            onClick={addNewPizza}
                            disabled={!products}
                            sx={{
                                bgcolor: '#295386',
                                color: 'white',
                                '&:hover': {
                                    color: '#295386'
                                }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    )
                }
            </Box> */}
        </Paper>
    )
}

export default TableSalads