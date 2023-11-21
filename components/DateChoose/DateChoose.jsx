'use client'

import { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateChoose() {

  const [value, setValue] = useState(null)

  function handleChange (event) {
    setValue(event)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Fecha"
          value={value}
          onChange={handleChange}
          slotProps={{
            textField: {
              // helperText: 'MM/DD/YYYY',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}