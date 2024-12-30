'use client'

import { useState, useEffect, useRef } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useGetPlace from '@/hooks/useGetPlace';
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'

import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import { getNearestSchedule, weekDaysEN, typeDeliveryOptions } from "@/utils/hours"

import { useSelector } from 'react-redux';

const daysES = {
  ['Monday']: 'Lunes',
  ['Tuesday']: 'Martes',
  ['Wednesday']: 'Miércoles',
  ['Thursday']: 'Jueves',
  ['Friday']: 'Viernes',
  ['Saturday']: 'Sábado',
  ['Sunday']: 'Domingo',
}

const monthsES = {
  ['January']: 'Enero',
  ['February']: 'Febrero',
  ['March']: 'Marzo',
  ['April']: 'Abril',
  ['May']: 'Mayo',
  ['June']: 'Junio',
  ['July']: 'Julio',
  ['August']: 'Agosto',
  ['September']: 'Septiembre',
  ['October']: 'Octubre',
  ['November']: 'Noviembre',
  ['December']: 'Diciembre',
}

function NoteCalendar() {
  return (
    <Typography
      color='primary'
      sx={{
        position: 'absolute',
        bottom: '8px',
        right: '24px'
      }}
    >
      Máximo 7 días
    </Typography>
  )
}

export default function DateChoose() {


  const { closerStore, typeDelivery, deadLine } = useSelector(state => state.place)
  const { handleDeadLine} = useGetPlace()
  const [date, setDate] = useState(() => {
    if (deadLine) {
      return dayjs(deadLine.date.realDate, 'YYYY/MM/DD')
    }
    const dayNear = getNearestAvailableDate({ Schedules: closerStore.Schedules, typeDelivery })
    return dayNear
  })
  const [textDate, setTextDate] = useState('')

  useEffect(() => {
    if (!date) return
    const currentDate = dayjs()
    let newTextDate
    if (date.isSame(currentDate, 'day')) {
      newTextDate = 'Hoy'
    } else if (date.isSame(currentDate.add(1, 'day'), 'day')) {
      newTextDate = 'Mañana'
    } else {
      newTextDate = daysES[date?.format('dddd')]
    }
    newTextDate = newTextDate + `, ${date['$D']} de ${monthsES[date.format('MMMM')]} del ${date.format('YYYY')}`
    setTextDate(newTextDate)
    handleDeadLine({property: 'date', value: {realDate: date.format('YYYY/MM/DD'), relativeDate: newTextDate}})
  }, [date])

  // Update data
  useEffect(() => {
    if (deadLine) return
    const dayNear = getNearestAvailableDate({ Schedules: closerStore.Schedules, typeDelivery })
    setDate(dayNear)
  }, [typeDelivery])

  function handleChange (event) {
    setDate(event)
  }

  function getNearestAvailableDate({ Schedules, typeDelivery }) {
    const schedulesFiltered = Schedules.filter(schedule => schedule.type === typeDeliveryOptions[typeDelivery.name] )
    const closerSchedule = getNearestSchedule(schedulesFiltered)
    const closerScheduleDay = dayjs().day(weekDaysEN.indexOf(closerSchedule.day))
    const nextcloserScheduleDay = closerScheduleDay.isBefore(dayjs()) ? closerScheduleDay.add(7, 'day') : closerScheduleDay
    return nextcloserScheduleDay
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      // adapterLocale='en-gb'
    >
      <DemoContainer
        components={['DatePicker']}
      >
        <DatePicker
          format='DD/MM/YYYY'
          label="Fecha"
          value={date}
          onChange={handleChange}
          // slots={{ textField: 'input'}}
          slotProps={{
            textField: {
              helperText: date.isBefore(dayjs(), 'day') ? 'La fecha de entrega debe ser mayor a la actual' : textDate,
              size:'small',
              readOnly: true
            }
          }}
          // maxDate={dayjs().add(1, 'week').subtract(1, 'day')}
          maxDate={dayjs().add(1, 'week')}
          // minDate={currentDate}
          disablePast={true}
          slots={{ actionBar: NoteCalendar}}
          // sx={{
          //   width:'100%',
          //   minWidth: '0px !important'
          // }}
          shouldDisableDate={(day) => {
            const dateToday = day.day()
            const datesNotAvailable = closerStore.Schedules.filter(schedule => schedule.type === typeDeliveryOptions[typeDelivery.name]).map(schedule => {
              return weekDaysEN.indexOf(schedule.day)             
            })
            return !datesNotAvailable.includes(dateToday)
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}