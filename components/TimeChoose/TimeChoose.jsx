'use client'

import dayjs from 'dayjs'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState, useEffect } from 'react'
import useGetPlace from '@/hooks/useGetPlace'

import { timeStringToObject, dateInRange, getTimeLimitTodaySchedue } from '@/utils/hours'

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

    const {place, handleDeadLine} = useGetPlace()
    const [hour, setHour] = useState( place && place.deadLine ? timeStringToObject(place.deadLine.time.realTime) : dayjs().add(30, 'minute'))
    const [textHour, setTextHour] = useState('')
    const [today, setToday] = useState(true)
    const [limitHours, setLimitHours] = useState(getTimeLimitTodaySchedue(place))
    const [timeWithinRange, setTimeWithinRange] = useState(dateInRange({minHour: limitHours.minHour, maxHour: limitHours.maxHour, currentDay: hour}))

    useEffect(() => {
        if (!place.deadLine) return
        setLimitHours(getTimeLimitTodaySchedue(place))
    }, [place])

    useEffect(() => {
        if (!(place.deadLine && place.deadLine.date)) return
        const currentDay = dayjs()
        const date = dayjs(place.deadLine.date.realDate, 'D/M/YYYY')
        const diffDays = date.format('D') - currentDay.format('D')
        if (diffDays === 0) return setToday(true)
        return setToday(false)
    }, [place])

    useEffect(() => {
        if (!hour) return
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
        setTextHour(totalText)
        handleDeadLine({
            property: 'time',
            value: {realTime: hour.format('hh:mm a'), relativeTime: totalText}
        })
    }, [hour])

    useEffect(() => {
        setTimeWithinRange(dateInRange({minHour: limitHours.minHour, maxHour: limitHours.maxHour, currentDay: hour}))
    }, [hour, limitHours])

    function handleHour(event) {
        setHour(event)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    format='hh:mm a'
                    label="Hora"
                    slotProps={{
                        textField: {
                          helperText: timeWithinRange ? today ? textHour : '' : `Fuera del horario de ${place.typeDelivery.totalName.toLowerCase()}`,
                          size:'small'
                        }
                    }}
                    value={hour}
                    onChange={handleHour}
                    disablePast={ place.deadLine ? dayjs().isSame(dayjs(place.deadLine.date.realDate, 'DD/MM/YYYY'), 'day') : false}
                    minTime={ place.deadLine && dayjs().isSame(dayjs(place.deadLine.date.realDate, 'DD/MM/YYYY'), 'day') ? dayjs().add(29, 'minute') : limitHours.minHour.add(30, 'minute')}
                    maxTime={limitHours.maxHour}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}