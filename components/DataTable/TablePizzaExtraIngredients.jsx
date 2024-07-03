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

import ModalPizzaExtraIngredientDetails from '@/components/ModalPizzaExtraIngredientDetails/ModalPizzaExtraIngredientDetails'
import TablePaginationActions from '@/components/TablePaginationActions/TablePaginationActions'

import { useState, useEffect } from 'react'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

const columns = ['ID', 'Nombre', 'Inventario', 'Precio', 'Acción']

function TablePizzaExtraIngredients() {

    const [pizzaExtraIngredientList, setPizzaExtraIngredientsList] = useState([])
    const { extraIngredients } = useGetExtraIngredients()
    const [extraIngredientSelected, setExtraIngredientSelected] = useState(null)
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const [openExtraIngredientDetails, setOpenExtraIngredientsDetails] = useState(false)
    const openMenu = Boolean(anchorElMenu)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
                                    <TableCell align='center'>{ingredient.id}</TableCell>
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
                    // onClick={() => {handleOpenExtraIngredientDetails(true)}}
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
                    />
                ) : null
            }
        </Paper>
    )
}

export default TablePizzaExtraIngredients