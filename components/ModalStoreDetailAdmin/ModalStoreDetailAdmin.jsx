import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { useState } from 'react'
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
                <InputUpdate
                    value={store.name}
                    updateProperty={updateStore}
                    updateState={updateStoreState}
                    properties={{ property: 'name', id: store.id}}
                    // handleChangeInput={handleChangeInput}
                    // pizzaNew={storeNew}
                    placeholder={'Nombre'}
                    // errors={errors?.name}
                />
                <Divider sx={{ width: '100%'}} />
                <Typography>{currentStore.city}</Typography>

            </Box>
        </Modal>
    )
}

export default ModalStoreDetailAdmin