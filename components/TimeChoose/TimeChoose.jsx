'use client'

import { useState, useEffect } from 'react'
import useGetPlace from '@/hooks/useGetPlace'
import dayjs from 'dayjs'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'

function differenceTime(now, later) {
    let minutes = later.format('m') - now.format('m')
    let hours = later.format('H') - now.format('H')
    if (minutes < 0 && hours > 0 ) {
        hours -= 1
        minutes = 60 + minutes
    }
    return [hours, minutes]
}

export default function TimePickerViewRenderers() {

    const [hour, setHour] = useState(null)
    const [textHour, setTextHour] = useState('')
    const {place, handleDeadLine} = useGetPlace()
    const [today, setToday] = useState(true)

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
            value: {realTime: hour.format('hh:mm'), relativeTime: totalText}
        })
    }, [hour])

    function handleHour(event) {
        setHour(event)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                {/* <TimePicker
                    label="Hora"
                    value={hour}
                    onChange={handleHour}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    // viewRenderers={
                    //     <StaticTimePicker orientation="landscape" />
                    // }
                /> */}
                <TimePicker
                    format='hh:mm'
                    label="Hora"
                    slotProps={{
                        textField: {
                          helperText: today ? textHour : '',
                          size:'small'
                        }
                    }}
                    value={hour}
                    onChange={handleHour}
                    disablePast={true}
                    minTime={dayjs().hour(8).minute(0).second(0)}
                    maxTime={dayjs().hour(21).minute(0).second(0)}
                />
        </DemoContainer>
        {/* <StaticTimePicker orientation="landscape" /> */}
        </LocalizationProvider>
    )
}