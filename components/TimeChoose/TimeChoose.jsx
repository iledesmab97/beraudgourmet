'use client'

import dayjs from 'dayjs'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import useGetPlace from '@/hooks/useGetPlace'

import { timeStringToObject, dateInRange, getTimeLimitTodaySchedue, objectDateToString } from '@/utils/hours'

function differenceTime(now, later) {
    let minutes = later.format('m') - now.format('m')
    let hours = later.format('H') - now.format('H')
    if (minutes < 0 && hours > 0 ) {
        hours -= 1
        minutes = 60 + minutes
    }
    return [hours, minutes]
}

export default function TimeChoose() {

    const { closerStore, typeDelivery, deadLine } = useSelector( state => state.place )
    const [limitHours, setLimitHours] = useState(getTimeLimitTodaySchedue({ closerStore, deadLine, typeDelivery }))
    const [hour, setHour] = useState( deadLine &&  deadLine.time ? timeStringToObject(deadLine.time.realTime) : dayjs().add(30, 'minute'))
    const { handleDeadLine} = useGetPlace()
    const [textHour, setTextHour] = useState('')
    const [today, setToday] = useState(true)
    const [timeWithinRange, setTimeWithinRange] = useState( () => {
        const { inRange , why } = dateInRange({minHour: limitHours.minHour, maxHour: limitHours.maxHour, daySelected: hour})
        return { inRange , why }
    })
    const [helperText, setHelperText] = useState('')

    // Actualizar el texto de ayuda del input
    useEffect(() => {
        let newHelperText = ''
        const { inRange, why } = timeWithinRange
        if (inRange) {
            if (today) newHelperText = textHour
        } else {
            if (why === 'past hour') newHelperText = `La hora seleccionada debe ser mayor a la actual (hora actual ${objectDateToString(dayjs()).split(' - ')[1]})`
            else if (why === 'too soon') newHelperText = `Mínimo 30 minutos entre la hora actual y la hora de entrega (${textHour})`
            else newHelperText = `Fuera del horario de ${typeDelivery.totalName.toLowerCase()} (${objectDateToString(limitHours.minHour).split(' - ')[1]} - ${objectDateToString(limitHours.maxHour).split(' - ')[1]})`
        }
        setHelperText(newHelperText)
    }, [timeWithinRange])

    // Actualizar los límites de horario de la nueva fecha
    useEffect(() => {
        if (!deadLine) return
        const { minHour, maxHour } = getTimeLimitTodaySchedue({ closerStore, deadLine, typeDelivery })
        setLimitHours({ minHour, maxHour })
    }, [closerStore, typeDelivery, deadLine])

    // Calcular si la nueva fecha seleccionada es hoy o no
    useEffect(() => {
        if (!(deadLine && deadLine.date)) return
        const currentDay = dayjs()
        const date = dayjs(deadLine.date.realDate, 'D/M/YYYY')
        const diffDays = date.format('D') - currentDay.format('D')
        if (diffDays === 0) return setToday(true)
        return setToday(false)
    }, [closerStore, typeDelivery, deadLine])

    useEffect(() => {
        if (!hour) return
        const relativeHour = getRelativeHour(hour)
        setTextHour(relativeHour)
        handleDeadLine({
            property: 'time',
            value: {realTime: hour.format('hh:mm a'), relativeTime: relativeHour}
        })
    }, [hour])

    useEffect(() => {
        if (!deadLine) return
        const dateSelectedObject = dayjs(deadLine.date.realDate.replaceAll('/', '-'), 'DD-MM-YYYY').hour(hour.hour()).minute(hour.minute())
        const { inRange, why } = dateInRange({minHour: limitHours.minHour, maxHour: limitHours.maxHour, daySelected: dateSelectedObject})
        setTimeWithinRange({ inRange, why })
    }, [hour, limitHours])

    function handleHour(event) {
        setHour(event)
    }

    function getRelativeHour(hour) {
        const currentHour = dayjs()
        let newTextHour
        let newTextMinutes
        const [diffHours, diffMinuts] = differenceTime(currentHour, hour)
        
        if (diffHours === 0) {
            newTextHour = ''
        } else if (diffHours === 1) {
            newTextHour = 'en 1 hora'
        } else if (diffHours > 1) {
            newTextHour = `en ${diffHours} horas`
        } else {
            newTextHour = ''
        }

        if (diffMinuts === 0) {
            newTextMinutes = ''
        } else if (diffMinuts === 1) {
            newTextMinutes = newTextHour ? ' y 1 minuto' : 'en 1 minuto'
        } else if (diffMinuts > 1) {
            newTextMinutes = newTextHour ? ` y ${diffMinuts} minutos` : `en ${diffMinuts} minutos`
        } else {
            newTextMinutes = 'Indica una hora mayor a la actual'
        }

        const totalText = `${newTextHour}${newTextMinutes}`
        return totalText
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    format='hh:mm a'
                    label="Hora"
                    slotProps={{
                        textField: {
                          helperText: helperText,
                          size:'small'
                        }
                    }}
                    value={hour}
                    onChange={handleHour}
                    disablePast={ deadLine ? dayjs().isSame(dayjs(deadLine.date.realDate, 'DD/MM/YYYY'), 'day') : false}
                    minTime={ deadLine && dayjs().isSame(dayjs(deadLine.date.realDate, 'DD/MM/YYYY'), 'day') ? dayjs().add(29, 'minute') : limitHours.minHour.add(29, 'minute')}
                    maxTime={limitHours.maxHour}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}