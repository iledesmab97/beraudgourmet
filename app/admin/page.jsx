'use client'

import ToolLateralBar from '@/components/ToolLateralBar/ToolLateralBar'
import DataPanel from '@/components/DataPanel/DataPanel'
import AlertMessage from '@/components/AlertMessage/AlertMessage'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'

import { useState, useEffect } from 'react'
import { useLoadScript } from "@react-google-maps/api"
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useLoadData from '@/hooks/useLoadData'

import { useDispatch } from 'react-redux'
import { addProductsListThunk } from '@/stores/actions/products'

import styles from './page.module.css'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function AdminPlace() {

    const [ toolSelected, setToolSelected] = useState('Orders')
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
        libraries: ['places'],
    })
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const [totalMatches, setTotalMatches] = useState('null')
    const [openToolLateralBar, setOpenToolLateralBar] = useState(false)
    const { loadData } = useLoadData()
    const dispatch = useDispatch();

    useEffect(() => {
        loadData('admin')
    }, [])


    useEffect(() => {
        dispatch(addProductsListThunk());
    }, [dispatch]);

    useEffect(() => {
        setTotalMatches(String(matches))
    }, [matches])

    function handleToolSelected(newTool) {
        setToolSelected(newTool)
    }

    function handleOpenToolLateralBar(value) {
        setOpenToolLateralBar(value)
    }

    return (
        <ErrorBoundary>
            <Container maxWidth='lg' sx={{ pb: 5 }}>
                <Grid
                    container
                    spacing={1}
                    alignItems='stretch'
                    justifyContent='space-between'
                    className={styles.AdminContainer}
                    sx={{
                        position: 'relative'
                    }}
                >
                    {
                        totalMatches === 'true' ? (
                            <>
                                <Drawer
                                    open={openToolLateralBar}
                                    onClose={() => {handleOpenToolLateralBar(false)}}
                                    anchor='left'
                                >
                                    <ToolLateralBar toolSelected={toolSelected} handleToolSelected={handleToolSelected} />
                                </Drawer>
                                <IconButton
                                    onClick={() => {handleOpenToolLateralBar(true)}}
                                    sx={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '0',
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </>

                        ) : totalMatches === 'false' ? <ToolLateralBar toolSelected={toolSelected} handleToolSelected={handleToolSelected} /> : null
                    }
                    <DataPanel toolSelected={toolSelected} />
                </Grid>
                <AlertMessage/>
            </Container>
        </ErrorBoundary>
    )
}

export default AdminPlace