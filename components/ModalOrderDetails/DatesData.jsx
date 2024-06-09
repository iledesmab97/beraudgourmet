import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import SelectDateTime from '@/components/ModalUserDetail/SelectDateTime'

import { useState } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { dateStringToDate, objectDateToString } from '@/utils/hours'
import { updateOrder } from '@/services/orderApi'

const userInformation = [
    {title: 'Fecha de emisión', name: 'dateEmited'},
    {title: 'Fecha de entrega', name: 'dateToRecive'}
]

const transformationDatesNames = {
    dateEmited: 'applicationDate',
    dateToRecive: 'deliveryDate'
}

function DatesData({dates, currentOrder, handleUpdateOrderProperty}) {

    const [datesObject, setDatesObject] = useState(() => {
        return {
            dateEmited: dateStringToDate(dates.dateEmited),
            dateToRecive: dateStringToDate(dates.dateToRecive)
        }
    })
    const [editing, setEditing] = useState({
        dateEmited: false,
        dateToRecive: false
    })
    const { handleUpdateAlertMessage } = useGetAlertMessage()

    async function handleEditing(editingDate) {
        if (editing[editingDate]) {
            const response = await updateOrderDates(editingDate)
            if (response.message) return
        }
        const newEditing = {
            ...editing,
            [editingDate]: !editing[editingDate]
        }
        setEditing(newEditing)
    }

    function handleChangeDatesObject( property, newDate) {
        const newDatesObject = {
            ...datesObject,
            [property]: newDate
        }
        setDatesObject(newDatesObject)
    }

    async function updateOrderDates(dateToUpdate) {
        console.log('Actualizando fechas de la orden...')

        const stringDateToUpdate = objectDateToString(datesObject[dateToUpdate])

        if (stringDateToUpdate === dates[dateToUpdate]) return {}
        
        const response = await updateOrder(currentOrder.id, { property: transformationDatesNames[dateToUpdate], value: stringDateToUpdate })

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
            handleUpdateOrderProperty({
                id: currentOrder.id,
                property: transformationDatesNames[dateToUpdate],
                value: stringDateToUpdate
            })
            console.log('Información guardada con exito')
        } else {
            console.log('No se ha guardado la información exitosamente')
        }
        return response
    }

    return (
        <>
            <Typography variant='title'>FECHAS</Typography>
            {
                userInformation.map((item) => (
                    <Box
                        key={dates[item.name]}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}
                    >
                        <Typography
                            variant='p'
                            gutterBottom
                        >
                            {`${item.title}:`}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <SelectDateTime
                                format='DD/MM/YYYY hh:mm a'
                                value={datesObject[item.name]}
                                onChange={(newDate) => {handleChangeDatesObject( item.name, newDate)}}
                                disabled={!editing[item.name]}
                            />
                            <IconButton
                                onClick={() => {handleEditing(item.name)}}
                            >
                                {
                                    editing[item.name] ? (
                                        <CheckIcon />
                                    ) : (
                                        <EditIcon />
                                    )
                                }
                            </IconButton>
                        </Box>
                    </Box>
                ))
            }
        </>
    )
}

export default DatesData