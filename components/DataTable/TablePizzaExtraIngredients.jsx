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
import Button from '@mui/material/Button'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'

import ModalPizzaExtraIngredientDetails from '@/components/ModalPizzaExtraIngredientDetails/ModalPizzaExtraIngredientDetails'
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'

import { useState, useEffect, useRef } from 'react'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { removeExtraIngredient } from '@/services/productApi'
import { deepEqual } from '@/utils/preparingData'

const columns = ['Disponible', 'Nombre', 'Inventario', 'Precio ($)', 'Acción']

function TablePizzaExtraIngredients() {

    const [pizzaExtraIngredientList, setPizzaExtraIngredientsList] = useState([])
    const { extraIngredients, handleAddExtraIngredinetsList, handleUpdateExtraIngredient } = useGetExtraIngredients()
    const [extraIngredientSelected, setExtraIngredientSelected] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [openExtraIngredientDetails, setOpenExtraIngredientsDetails] = useState(false)
    const openMenu = Boolean(anchorElMenu)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { handleUpdateAlertMessage } = useGetAlertMessage()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const newExtraIngredient = useRef(false)

    function toggleMenu() {
        setAnchorElMenu(null)
    }

    useEffect(() => {
        if (!Object.keys(extraIngredients).length) return
        const newPizzaExtraIngerdientList = []
        for (let ingredient in extraIngredients) {
            newPizzaExtraIngerdientList.push(extraIngredients[ingredient])
        }
        setPizzaExtraIngredientsList(newPizzaExtraIngerdientList)
    }, [extraIngredients])

    useEffect(() => {
        if (!deepEqual(extraIngredientSelected, {name: '', price: ''})) return
        newExtraIngredient.current = true
        handleOpenExtraIngredientDetails(true)
    }, [extraIngredientSelected])

    function handleClickButtonAction(event, ingredient) {
        setAnchorElMenu(event.currentTarget)
        setExtraIngredientSelected(ingredient)
    }

    function handleOpenExtraIngredientDetails(value) {
        setOpenExtraIngredientsDetails(value)
        toggleMenu()
        if (!value) {
            setExtraIngredientSelected(null)
        }
    }

    function handleChangePage(newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function updateExtraIngredientOfList({newExtraIngredient, lastExtraIngredient, property}) {
        if (property === 'name') {
            const newExtraIngredients = {...extraIngredients, [newExtraIngredient.name]: newExtraIngredient}
            delete newExtraIngredients[lastExtraIngredient.name]
            handleAddExtraIngredinetsList({extraIngredientsList: newExtraIngredients})
        } else {
            handleUpdateExtraIngredient(newExtraIngredient)
        }
    }

    async function deleteExtraIngredient() {
        toggleMenu()
        console.log('eliminando ingrediente extra...')

        const response = await removeExtraIngredient(extraIngredientSelected.id)
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
            const newExtraIngredients = {...extraIngredients}
            delete newExtraIngredients[extraIngredientSelected.name]
            handleAddExtraIngredinetsList({extraIngredientsList: newExtraIngredients})
            return console.log('Ingrediente eliminado exitosamente')
        }
        return console.log('No se pudo borra el ingrediente...')
    }

    function addNewExtraIngredient() {
        setExtraIngredientSelected({
            name: '',
            price: ''
        })
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
                            pizzaExtraIngredientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(ingredient => (
                                <TableRow key={ingredient.name}>
                                    <TableCell align='center'>
                                        {
                                            ingredient.available ? (
                                                <CheckCircleIcon sx={{ color: '#4caf50'}} />
                                            ) : (
                                                <CancelIcon sx={{ color: '#f6685e'}} />
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>{ingredient.name}</TableCell>
                                    <TableCell align='center'>Infinito</TableCell>
                                    <TableCell align='center'>{ingredient.totalPrice}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            onClick={(event) => handleClickButtonAction(event, ingredient)}
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
                count={pizzaExtraIngredientList.length}
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
                    onClick={() => {handleOpenExtraIngredientDetails(true)}}
                >
                    Ver Detalles
                </MenuItem>
                <MenuItem
                    onClick={deleteExtraIngredient}
                >
                    Eliminar
                </MenuItem>
            </Menu>
            {
                extraIngredientSelected ? (
                    <ModalPizzaExtraIngredientDetails
                        openExtraIngredientDetails={openExtraIngredientDetails}
                        handleOpenExtraIngredientDetails={handleOpenExtraIngredientDetails}
                        extraIngredientSelected={extraIngredientSelected}
                        updateExtraIngredientOfList={updateExtraIngredientOfList}
                        extraIngredients={extraIngredients}
                        newExtraIngredient={newExtraIngredient.current}
                    />
                ) : null
            }
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '102%',
                    right: '16px'
                }}
            >
                {
                    !matches ? (
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            onClick={addNewExtraIngredient}
                            disabled={!extraIngredients}
                        >
                            Nueva Pizza
                        </Button>
                    ) : (
                        <IconButton
                            onClick={addNewExtraIngredient}
                            disabled={!extraIngredients}
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
            </Box>
        </Paper>
    )
}

export default TablePizzaExtraIngredients