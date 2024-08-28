import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { TimeField } from '@mui/x-date-pickers/TimeField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState } from 'react'

import dayjs from 'dayjs'
import { timeStringToObject } from '@/utils/hours'

function InputTime({ time, onChangeTime, property, maxTime, minTime, ...props }) {

    function handleChange(newTime) {
        const [date, timeString] = newTime.format('YYYY/MM/DD - hh:mm a').split(' - ')
        onChangeTime(property, timeString)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    value={timeStringToObject(time)}
                    onChange={handleChange}
                    format='hh:mm a'
                    maxTime={maxTime ? timeStringToObject(maxTime) : null}
                    minTime={minTime ? timeStringToObject(minTime) : null}                    
                    {...props}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default InputTime