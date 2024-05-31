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
import { TimePicker } from '@mui/x-date-pickers/TimePicker'


import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add';

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import InputTime from '@/components/InputTime/InputTime'

import { useState, useEffect, useRef } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { weekDaysES } from '@/utils/hours'
import { updateSchedulesHoursOfSchedules } from '@/services/scheduleApi'
import { deepEqual } from '@/utils/preparingData'

function Schedules({ store, updateScheduleHoursStoreState }) {

    const [selectValue, setSelectValue] = useState('work')
    const [scheduleList, setScheduleList] = useState(store[selectValue + 'Schedule'][selectValue + 'Schedule'])
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const openMenu = Boolean(anchorElMenu)
    const [editing, setEditing] = useState(scheduleList.map(() => false))
    const selectedScheduleIndex = useRef(null)
    const [inputEditing, setInputEditing] = useState(null)
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    useEffect(() => {
        const trueIndex = editing.indexOf(true)
        if (trueIndex === -1) return
        setInputEditing(() => {
            const id = scheduleList[trueIndex].id
            const [startDay, endDay] = scheduleList[trueIndex].days.split('-')
            const [startTime, endTime] = scheduleList[trueIndex].hours.split(' - ')
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
        const newScheduleList = store[value + 'Schedule'][value + 'Schedule']
        setScheduleList(newScheduleList)
        setEditing(newScheduleList.map(() => false))
    }

    function handleCloseMenu() {
        setAnchorElMenu(null)
    }

    function handleMenuOpening(event, index) {
        setAnchorElMenu(event.currentTarget)
        selectedScheduleIndex.current = index
    }

    function handleEdit(edit) {
        if (edit) {
            setEditing(prevState => {
                const newState = [...prevState]
                return newState.map((edit, index) => {
                    if (index === selectedScheduleIndex.current) return true
                    return false
                })
            })
        } else {
            selectedScheduleIndex.current = null
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

    async function updateSchedule() {
        handleCloseMenu()
        const newScheduleHour = {
            id: inputEditing.id,
            days: inputEditing.startDay + '-' + inputEditing.endDay,
            hours:  inputEditing.startTime + ' - ' + inputEditing.endTime
        }
        const lastScheduleHour = [...scheduleList].find((scheduleHour, index) => scheduleHour.id === inputEditing.id)
        
        if (deepEqual(newScheduleHour, lastScheduleHour)) return handleEdit(false)
        
        const newScheduleHours = [...scheduleList].map(scheduleHour => ({
            id: scheduleHour.id,
            day: scheduleHour.days,
            startTime: scheduleHour.hours.split(' - ')[0],
            endTime: scheduleHour.hours.split(' - ')[1],
        }))
        let indexScheduleHourToUpdate
        newScheduleHours.find((scheduleHour, index) => {
            if (scheduleHour.id === inputEditing.id) {
                indexScheduleHourToUpdate = index
                return true
            }
        })
        const scheduleHourUpdated = {
            id: inputEditing.id,
            day: inputEditing.startDay + '-' + inputEditing.endDay,
            startTime:  inputEditing.startTime,
            endTime: inputEditing.endTime
        }
        newScheduleHours[indexScheduleHourToUpdate] = scheduleHourUpdated
        const response = await updateSchedulesHoursOfSchedules(store[selectValue + 'Schedule'].id, newScheduleHours)
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
            updateScheduleHoursStoreState({
                schedule: selectValue + 'Schedule',
                newScheduleHours
            })
            setScheduleList(() => {
                return newScheduleHours.map(schedule => ({
                    id: schedule.id,
                    days: schedule.day,
                    hours: schedule.startTime + ' - ' + schedule.endTime
                }))
            })
            handleEdit(false)
            return console.log('Actualización exitosa')
        }
        console.log('No se ha actualizado la información')
    }

    function addNewScheduleHours() {
        const newScheduleList = [...scheduleList]
        let lastId = 0
        newScheduleList.forEach(schedule => {
            if (String(schedule.id).includes('new')) {
                lastId = lastId > Number(String(schedule.id).split('new')[1]) ? lastId : Number(String(schedule.id).split('new')[1])
            }
        })
        newScheduleList.push({
            id: `new${lastId + 1}`,
            days: 'Lunes-Domingo',
            hours: '08:00 am - 08:00 pm'
        })
        setScheduleList(newScheduleList)
        setEditing(newScheduleList.map(() => false))
    }

    async function removeSchedule() {
        handleCloseMenu()
        const newScheduleHours = [...scheduleList].filter((schedule, index) => index !== selectedScheduleIndex.current).map(scheduleHour => ({
            id: scheduleHour.id,
            day: scheduleHour.days,
            startTime: scheduleHour.hours.split(' - ')[0],
            endTime: scheduleHour.hours.split(' - ')[1],
        }))
        const response = await updateSchedulesHoursOfSchedules(store[selectValue + 'Schedule'].id, newScheduleHours)
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
            updateScheduleHoursStoreState({
                schedule: selectValue + 'Schedule',
                newScheduleHours
            })
            setScheduleList(() => {
                return newScheduleHours.map(schedule => ({
                    id: schedule.id,
                    days: schedule.day,
                    hours: schedule.startTime + ' - ' + schedule.endTime
                }))
            })
            handleEdit(false)
            return console.log('Actualización exitosa')
        }
        console.log('No se ha actualizado la información')
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
                    sx={{
                        position: 'relative'
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Día Inicio</TableCell>
                                    <TableCell>Día Fin</TableCell>
                                    <TableCell>Hora Inicio</TableCell>
                                    <TableCell>Hora Fin</TableCell>
                                    <TableCell
                                        sx={{
                                            width: '75px'
                                        }}
                                    >Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    scheduleList.map((schedule, index) => (
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
                                                                        weekDaysES.map((day, index) => (
                                                                            <MenuItem
                                                                                key={`startDay:${day}`}
                                                                                value={day}
                                                                                disabled={index > weekDaysES.indexOf(inputEditing.endDay)}
                                                                            >
                                                                                {day}
                                                                            </MenuItem>
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
                                                                        weekDaysES.map((day, index) => (
                                                                            <MenuItem
                                                                                key={`endDay:${day}`}
                                                                                value={day}
                                                                                disabled={index < weekDaysES.indexOf(inputEditing.startDay)}
                                                                            >
                                                                                {day}
                                                                            </MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell>
                                                            <InputTime
                                                                time={inputEditing.startTime}
                                                                label="Hora de apertura"
                                                                onChangeTime={handleChangeDay}
                                                                property={'startTime'}
                                                                maxTime={inputEditing.endTime}
                                                                sx={{
                                                                    '&.MuiTextField-root': {
                                                                        minWidth: '100px'
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <InputTime
                                                                time={inputEditing.endTime}
                                                                label="Hora de cierre"
                                                                onChangeTime={handleChangeDay}
                                                                property={'endTime'}
                                                                minTime={inputEditing.startTime}
                                                                sx={{
                                                                    '&.MuiTextField-root': {
                                                                        minWidth: '100px'
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
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
                    <IconButton
                        onClick={addNewScheduleHours}
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            right: '0px'
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                {
                    editing[selectedScheduleIndex.current] ? (
                        <MenuItem
                            onClick={updateSchedule}
                        >
                            Actualizar
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {handleEdit(true)}}
                        >
                            Editar
                        </MenuItem>
                    )
                }
                <MenuItem
                    onClick={removeSchedule}
                >
                    Borrar
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Schedules