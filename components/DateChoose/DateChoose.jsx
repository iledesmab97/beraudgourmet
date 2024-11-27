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
import { getNearestSchedule, weekDaysEN, typeDelivery } from "@/utils/hours"

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


  const { place, handleDeadLine} = useGetPlace()
  const [currentTypeDelivery, setCurrentTypeDelivery] = useState(place.typeDelivery)
  const [date, setDate] = useState( place && place.deadLine ? dayjs(place.deadLine.date.realDate, 'DD/MM/YYYY') : getNearestAvailableDate(place.closerStore))
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
    handleDeadLine({property: 'date', value: {realDate: date.format('DD/MM/YYYY'), relativeDate: newTextDate}})
  }, [date])

  function handleChange (event) {
    setDate(event)
  }

  function getNearestAvailableDate(store) {
    const { Schedules } = store
    const pickupSchedules = Schedules.filter(schedule => schedule.type === typeDelivery[currentTypeDelivery.name] )
    const closerSchedule = getNearestSchedule(pickupSchedules)
    const closerScheduleDay = dayjs().day(weekDaysEN.indexOf(closerSchedule.day))
    return closerScheduleDay
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
              size:'small'
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
            const datesNotAvailable = place.closerStore.Schedules.filter(schedule => schedule.type === typeDelivery[currentTypeDelivery.name]).map(schedule => {
              return weekDaysEN.indexOf(schedule.day)             
            })
            return !datesNotAvailable.includes(dateToday)
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}