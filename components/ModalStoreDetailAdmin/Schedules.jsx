import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography' 
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import TimePickerViewRenderers from '@/components/TimeChoose/TimeChoose'

import { useState, useEffect } from 'react'

import { weekDaysES } from '@/services/storeApi'

function Schedules({ store }) {

    const [selectValue, setSelectValue] = useState('work')
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const openMenu = Boolean(anchorElMenu)
    const [editing, setEditing] = useState(store[selectValue + 'Schedule'].map(() => false))
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(null)
    const [inputEditing, setInputEditing] = useState(null)

    useEffect(() => {
        const trueIndex = editing.indexOf(true)
        if (trueIndex === -1) return
        setInputEditing(() => {
            const id = store[selectValue + 'Schedule'][trueIndex].id
            const [startDay, endDay] = store[selectValue + 'Schedule'][trueIndex].days.split('-')
            const [startTime, endTime] = store[selectValue + 'Schedule'][trueIndex].hours.split(' - ')
            return {
                id,
                startDay,
                endDay: endDay ? endDay : startDay,
                startTime,
                endTime
            }
        })
    }, [editing])

    function handleChangeShedule(value) {
        setSelectValue(value)
        setEditing(store[value + 'Schedule'].map(() => false))
    }

    function handleCloseMenu() {
        setAnchorElMenu(null)
    }

    function handleMenuOpening(event, index) {
        setAnchorElMenu(event.currentTarget)
        setSelectedScheduleIndex(index)
    }

    function handleEdit(edit) {
        if (edit) {
            setEditing(prevState => {
                const newState = [...prevState]
                return newState.map((edit, index) => {
                    if (index === selectedScheduleIndex) return true
                    return false
                })
            })
        } else {
            setSelectedScheduleIndex(null)
            setEditing(prevState => {
                return [...prevState].map(() => false)
            })
        }
        handleCloseMenu()
    }

    function handleChangeDay(property, value) {
        setInputEditing(prevState => ({
            ...prevState,
            [property]: value
        }))
    }

    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography variant='encabezado' sx={{ alignSelf: 'flex-start' }}>Horarios</Typography>
            </Grid>
            <Grid container item spacing={2}>
                <Grid
                    container
                    item
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                >
                    <Grid item xs={3}>
                        <Typography align='center'>Horarios:</Typography>
                    </Grid>
                    <Grid item>
                        <Select
                            value={selectValue}
                            onChange={(event) => {handleChangeShedule(event.target.value)}}
                        >
                            <MenuItem value={'work'}>Trabajo</MenuItem>
                            <MenuItem value={'pickup'}>Recoger</MenuItem>
                            <MenuItem value={'delivery'}>Entrega</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Día Inicio</TableCell>
                                    <TableCell>Día Fin</TableCell>
                                    <TableCell>Hora Inicio</TableCell>
                                    <TableCell>Hora Fin</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    store[selectValue + 'Schedule'].map((schedule, index) => (
                                        <TableRow key={schedule.id}>
                                            {
                                                editing[index] && inputEditing ? (
                                                    <>
                                                        <TableCell>
                                                            <FormControl>
                                                                <Select
                                                                    value={inputEditing.startDay}
                                                                    onChange={(event) => {handleChangeDay('startDay', event.target.value)}}
                                                                >
                                                                    {
                                                                        weekDaysES.map(day => (
                                                                            <MenuItem key={`startDay:${day}`} value={day}>{day}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormControl>
                                                                <Select
                                                                    value={inputEditing.endDay}
                                                                    onChange={(event) => {handleChangeDay('endDay', event.target.value)}}
                                                                >
                                                                    {
                                                                        weekDaysES.map(day => (
                                                                            <MenuItem key={`startDay:${day}`} value={day}>{day}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell>{schedule.hours.split(' - ')[0]}</TableCell>
                                                        <TableCell>{schedule.hours.split(' - ')[1]}</TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={(event) => handleMenuOpening(event, index)}
                                                            >
                                                                <MoreHorizIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell>{schedule.days.split('-')[0]}</TableCell>
                                                        <TableCell>{schedule.days.split('-')[1]}</TableCell>
                                                        <TableCell>{schedule.hours.split(' - ')[0]}</TableCell>
                                                        <TableCell>{schedule.hours.split(' - ')[1]}</TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={(event) => handleMenuOpening(event, index)}
                                                            >
                                                                <MoreHorizIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                                )
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                {
                    editing[selectedScheduleIndex] ? (
                        <MenuItem
                            onClick={() => {handleEdit(false)}}
                        >
                            Confirmar Cambios
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {handleEdit(true)}}
                        >
                            Editar
                        </MenuItem>
                    )
                }
                <MenuItem>Borrar</MenuItem>
            </Menu>
        </Grid>
    )
}

export default Schedules