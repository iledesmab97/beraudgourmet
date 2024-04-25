import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

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
        setStore(prevState => ({
            ...prevState,
            [property]: value
        }))
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
                <Typography variant='title'>
                    {store.name} Nº{store.id}
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography align='right'>Nombre: </Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography align='right'>Ciudad:</Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <InputUpdate
                                value={store.city}
                                updateProperty={updateStore}
                                updateState={updateStoreState}
                                properties={{ property: 'city', id: store.id}}
                                // handleChangeInput={handleChangeInput}
                                // pizzaNew={storeNew}
                                placeholder={'Ciudad'}
                                // errors={errors?.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography align='right'>Teléfono:</Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <InputUpdate
                                value={store.phone}
                                updateProperty={updateStore}
                                updateState={updateStoreState}
                                properties={{ property: 'phone', id: store.id}}
                                // handleChangeInput={handleChangeInput}
                                // pizzaNew={storeNew}
                                placeholder={'Teléfono'}
                                // errors={errors?.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography align='right'>Coordenadas:</Typography>
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <InputUpdate
                                value={store.name}
                                updateProperty={updateStore}
                                updateState={updateStoreState}
                                properties={{ property: 'name', id: store.id}}
                                // handleChangeInput={handleChangeInput}
                                // pizzaNew={storeNew}
                                placeholder={'Coordenadas'}
                                // errors={errors?.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Grid item xs={2}>
                            <Typography align='right'>Dirección:</Typography>
                        </Grid>
                        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <InputUpdate
                                value={store.place}
                                updateProperty={updateStore}
                                updateState={updateStoreState}
                                properties={{ property: 'place', id: store.id}}
                                // handleChangeInput={handleChangeInput}
                                // pizzaNew={storeNew}
                                placeholder={'Dirección'}
                                // errors={errors?.name}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ width: '100%'}} />
                <Typography>{currentStore.city}</Typography>

            </Box>
        </Modal>
    )
}

export default ModalStoreDetailAdmin