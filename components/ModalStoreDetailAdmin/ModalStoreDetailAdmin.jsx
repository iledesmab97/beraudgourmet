import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import InputUpdate from '@/components/InputUpdate/InputUpdate'
import StoreData from './StoreData'
import Schedules from './Schedules'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'

import { updateStore } from '@/services/storeApi'

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

function ModalStoreDetailAdmin({ openStoreDetails, handleOpenStoreDetail, currentStore, storeNew }) {

    const [store, setStore] = useState(currentStore)

    const { storeList, handleAddStoreList, handleUpdateStoreList } = useGetStoreList()

    function updateStoreState({ id, property, value }) {
        if (property === 'lat' || property === 'lng') {
            setStore(prevState => ({
                ...prevState,
                coordinates: {
                    ...prevState.coordinates,
                    [property]: value
                }
            }))
        } else {
            setStore(prevState => ({
                ...prevState,
                [property]: value
            }))
        }
        handleUpdateStoreList({ id, property, value })
    }

    return (
        <Modal
            open={openStoreDetails}
            onClose={() => {handleOpenStoreDetail(false)}}
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
                        {store.name} Nº{store.id}
                    </Typography>
                    <StoreData 
                        store={store}
                        updateStoreState={updateStoreState}
                    />
                    <Divider sx={{ width: '100%'}} />
                    <Schedules store={store}/>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalStoreDetailAdmin