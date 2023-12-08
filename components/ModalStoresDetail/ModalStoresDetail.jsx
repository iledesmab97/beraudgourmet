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

    const { open, handleCloseModal } = useGetModal({ modalType: 'storesDetail' })
    const {place, handleAddPlace} = useGetPlace()
    const inputsHome = place.inputsHome
    const closerStore = place.closerStore
    const {currentStore, handleCurrentStoreDetail} = useHandleStoresDetail({place: closerStore})

    if ( !currentStore ) return

    return (
        <Modal
            open={open}
            onClose={() => { handleCloseModal('storesDetail')}}
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

                    <ListStores handleCurrentStoreDetail={handleCurrentStoreDetail} place={closerStore}/>
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
                            handleAddPlace({closerStore})
                            handleCloseModal('storesDetail')
                        }}
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