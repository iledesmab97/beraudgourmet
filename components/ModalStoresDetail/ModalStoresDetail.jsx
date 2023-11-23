'use client'

import { useEffect, useState } from 'react'
import useGetModal from '@/hooks/useGetModal'
import useGetPlace from '@/hooks/useGetPlace'
import ListStores from './ListStores'
import DetailStore from './DetailStore'
import useHandleStoresDetail from '@/hooks/useHandleStoresDetail'
import { accept } from '@/genericFunctions/modal'

import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 5,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  };

function ModalStoresDetail() {

    const { open, handleCloseModalStoresDetail } = useGetModal({ modalType: 'storesDetail' })
    const dataPlace = useGetPlace()
    const inputsHome = dataPlace.place.inputsHome
    const place = dataPlace.place.closerStore ? dataPlace.place.closerStore : dataPlace.place
    const handleAddPlace = dataPlace.handleAddPlace
    const {currentStore, handleCurrentStoreDetail} = useHandleStoresDetail({place})

    if (!place.name) return

    return (
        <Modal
            open={open}
            onClose={handleCloseModalStoresDetail}
        >
            <Grid
                sx={style}
                container
            >
                <Grid item
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant='title'
                        component="h2"
                        align='center'
                    >
                        Elegir una tienda
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='stretch'
                    spacing={1}
                    sx={{
                        height: '85%'
                    }}
                >

                    <ListStores handleCurrentStoreDetail={handleCurrentStoreDetail} place={place}/>
                    <DetailStore currentStore={currentStore}/>

                </Grid>
                <Grid item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        variant='contained'
                        disabled={( currentStore.open ? false : true ) || Boolean(inputsHome) }
                        onClick={() => { 
                            accept({action: handleAddPlace, value: currentStore}, handleCloseModalStoresDetail) }}
                    >
                        <Typography>
                            Pedir a la tienda
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ModalStoresDetail