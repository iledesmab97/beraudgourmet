'use client'

import { useState, useEffect, useRef } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'

const daysWeek = {
  ['Monday']: 'Lunes',
  ['Tuesday']: 'Martes',
  ['Wednesday']: 'Miércoles',
  ['Thuersday']: 'Jueves',
  ['Friday']: 'Viernes',
  ['Saturday']: 'Sábado',
  ['Sunday']: 'Domingo',
}

export default function DateChoose() {

  const [date, setDate] = useState(null)

  function handleChange (event) {
    setDate(event)
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      // adapterLocale='en-gb'
    >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          format='DD/MM/YYYY'
          label="Fecha"
          value={date}
          onChange={handleChange}
          // slots={{ textField: 'input'}}
          slotProps={{
            textField: {
              helperText: date?.isSame(dayjs(), 'day') ? 'Hoy': date?.isSame(dayjs().add(1, 'day'), 'day') ? 'Mañana' : daysWeek[date?.format('dddd')] ,
            },
          }}
          // maxDate={dayjs().add(1, 'week').subtract(1, 'day')}
          maxDate={dayjs().add(1, 'week')}
          // minDate={currentDate}
          disablePast={true}
          // slots={{ textField: 'input'}}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}