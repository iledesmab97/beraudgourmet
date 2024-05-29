'use client'

import ToolLateralBar from '@/components/ToolLateralBar/ToolLateralBar'
import DataPanel from '@/components/DataPanel/DataPanel'
import AlertMessage from '@/components/AlertMessage/AlertMessage'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'

import { useState, useEffect } from 'react'
import useGetUser from '@/hooks/useGetUser';
import useGetProducts from '@/hooks/useGetProducts'
import useGetStoreList from '@/hooks/useGetStoreList'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useLoadScript } from "@react-google-maps/api"
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { lookingForUserLoged } from '@/services/userApi'
import { getPizzasWithCosts, getExtraIngredients } from '@/services/productApi'
import { getAllStoresWithSchedules } from '@/services/storeApi'

import styles from './page.module.css'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function AdminPlace() {

    const [ toolSelected, setToolSelected] = useState('Orders')
    const { handleAddUser } = useGetUser()
    const { products, handleAddProductsList } = useGetProducts({type:'pizzas'})
    const { storeList, handleAddStoreList } = useGetStoreList()
    const { extraIngredients, handleAddExtraIngredinetsList } = useGetExtraIngredients()
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
        libraries: ['places'],
    })
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const [totalMatches, setTotalMatches] = useState('null')
    const [openToolLateralBar, setOpenToolLateralBar] = useState(false)

    useEffect(() => {
        lookingForUserLoged()
            .then( userLoged => {
                if (!userLoged) return
                handleAddUser(userLoged)
            })
            .catch(error => alert(error.message))
        if (!(products && products.pizzas)) {
            getPizzasWithCosts().then(data => {
                handleAddProductsList({
                type: 'pizzas',
                products: data
                })
            })
        }
        if (!(storeList && Object.keys(storeList).length)) {
            getAllStoresWithSchedules().then(storeList => {
                handleAddStoreList(storeList)
            })
        }
        if (!Object.keys(extraIngredients).length) {
            getExtraIngredients().then(data => {
                handleAddExtraIngredinetsList({ extraIngredientsList: data })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTotalMatches(String(matches))
    }, [matches])

    function handleToolSelected(event: any) {
        setToolSelected(event.target.textContent)
    }

    function handleOpenToolLateralBar(value: boolean) {
        setOpenToolLateralBar(value)
    }

    return (
        <Container maxWidth='lg'>
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
    )
}

export default AdminPlace