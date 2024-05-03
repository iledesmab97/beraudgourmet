import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'

// import InputUpdate from '@/components/InputUpdate/InputUpdate'
import UserData from './UserData'
// import Schedules from './Schedules'

import { useState, useEffect } from 'react'
// import useGetStoreList from '@/hooks/useGetStoreList'

// import { updateStore } from '@/services/storeApi'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    pb: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
}

function ModalUserDetail({ openModal, handleOpenModal, currentUser, updateUser }) {

    const [user, setUser] = useState(currentUser)

    // const { storeList, handleAddStoreList, handleUpdateStoreList, updateScheduleHoursStore } = useGetStoreList()

    // function updateDataStoreState({ id, property, value }) {
    //     if (property === 'lat' || property === 'lng') {
    //         setUser(prevState => ({
    //             ...prevState,
    //             coordinates: {
    //                 ...prevState.coordinates,
    //                 [property]: value
    //             }
    //         }))
    //     } else {
    //         setUser(prevState => ({
    //             ...prevState,
    //             [property]: value
    //         }))
    //     }
    //     handleUpdateStoreList({ id, property, value })
    // }

    // function updateScheduleHoursStoreState({ schedule, newScheduleHours }) {
    //     const newState = {
    //         ...user
    //     }
    //     newState[schedule] = {
    //         ...newState[schedule],
    //         [schedule]: newScheduleHours.map(scheudleHour => ({
    //             id: scheudleHour.id,
    //             days: scheudleHour.day,
    //             hours: scheudleHour.startTime + ' - ' + scheudleHour.endTime
    //         }))
    //     }
    //     setUser(newState)
    //     updateScheduleHoursStore(newState)
    // }

    return (
        <Modal
            open={openModal}
            onClose={() => {handleOpenModal(false)}}
        >
            <Box
                sx={style}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        pr: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography variant='title'>
                        {user.name} Nº{user.id}
                    </Typography>
                    <UserData
                        user={user}
                        updateUser={updateUser}
                    />
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserDetail