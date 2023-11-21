'use client'

import { useState } from 'react'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'

export default function TimePickerViewRenderers() {

    const [hour, setHour] = useState(null)

    function handleHour(event) {
        setHour(event)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
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
                />
        </DemoContainer>
        {/* <StaticTimePicker orientation="landscape" /> */}
        </LocalizationProvider>
    )
}