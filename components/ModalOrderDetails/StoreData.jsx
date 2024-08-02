import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { useState, useEffect } from 'react'
import useGetAlertMessage from '@/hooks/useGetAlertMessage'

import { updateOrder } from '@/services/orderApi'
import { getAllStores, getOneStoreById } from '@/services/storeApi'

function StoreData({ storeSelected, loading, error, currentOrder, handleUpdateOrderProperty }) {

    const [inputValue, setInputValue] = useState({
        id: '',
        name: ''
    })
    const [editing, setEditing] = useState(false)
    const [storeList, setStoreList] = useState([])
    const [open, setOpen] = useState({
        openId: false,
        openName: false,
    })
    const loadingStoreList = Object.keys(open).some(i => open[i]) && storeList.length === 0

    const { handleUpdateAlertMessage } = useGetAlertMessage()

    useEffect(() => {
        if (!storeSelected) return
        setInputValue({
            id: String(storeSelected.id),
            name: storeSelected.name
        })
    }, [storeSelected])

    useEffect(() => {
        let active = true
        if (!loadingStoreList) {
            return
        }

        async function getStores() {
            const newStoreList = await getAllStores()
            if (newStoreList.message) {
                alert(newStoreList.message)
            } else {
                if (active) {
                    setStoreList(newStoreList)
                }
            }
        }

        getStores()
        
        return () => {
            active = false
        }

    }, [open])

    function handleChangeOpen(value, item) {
        setOpen(prevState => ({
            ...prevState,
            [item]: value
        }))
    }

    async function handleEditing() {
        if (editing && storeSelected.id !== store.id) {
            const response = await updateDataStore()
            if (response.message) return
        }
        setEditing(prevState => !prevState)
    }

    function handleChangeStoreSelected({ property, value }) {
        let newStore = {}
        if (value === null) return
        if ( property === undefined || value === undefined ) return
        if ( !['id', 'name'].includes(property) ) return
        newStore = storeList.find(store => {
            if (property === 'id') {
                return store[property] === Number(value)
            } else if ( property === 'name' ) {
                return store[property] === value
            }
        })
        setStoreSelected(newStore)
    }

    function handleChangeInputStoreValue({ property, value }) {
        if ( property === undefined || value === undefined ) return
        if ( !['id', 'name'].includes(property) ) return
        const newInputValue = {
            ...inputValue,
            [property]: value
        }
        setInputValue(newInputValue)
    }

    async function updateDataStore() {
        console.log('Actualizando información...')
        const response = await updateOrder( currentOrder.id, { property: 'StoreId', value: storeSelected.id })
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
                    property: 'store',
                    value: {
                        id: storeSelected.id,
                        name: storeSelected.name,
                        phoneNumber: storeSelected.phone,
                        address: storeSelected.place
                    }
                })
                console.log('Información guardada con exito')
            } else {
                console.log('No se ha guardado la información exitosamente')
            }
            return response
    }

    return (
        <>
            <Typography variant='title'>TIENDA</Typography>
            {
                loading && <h1>Loading...</h1>
            }
            {
                error && <h1>Error: {error}</h1>
            }
            {
                storeSelected ? (
                    <>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                ID
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Autocomplete
                                    open={open['openId']}
                                    onOpen={() => {handleChangeOpen(true, 'openId')}}
                                    onClose={() => {handleChangeOpen(false, 'openId')}}
                                    getOptionDisabled={(option) => String(option) === String(storeSelected.id)}
                                    loading={loadingStoreList}
                                    value={storeSelected.id ? String(storeSelected.id) : null}
                                    onChange={(event, id) => {handleChangeStoreSelected({property: 'id', value: id})}}
                                    inputValue={inputValue.id}
                                    onInputChange={(event, id) => {handleChangeInputStoreValue({property: 'id', value: id})}}
                                    options={storeList.map(store => String(store.id))}
                                    sx={{ width: '125px' }}
                                    renderInput={(params) => {
                                        return <TextField {...params} />
                                    }}
                                    disabled={!editing}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                Tienda
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Autocomplete
                                    open={open['openName']}
                                    onOpen={() => {handleChangeOpen(true, 'openName')}}
                                    onClose={() => {handleChangeOpen(false, 'openName')}}
                                    getOptionDisabled={(option) => String(option) === String(storeSelected.name)}
                                    loading={loadingStoreList}
                                    value={storeSelected.name ? storeSelected.name : null}
                                    onChange={(event, name) => {handleChangeStoreSelected({property: 'name', value: name})}}
                                    inputValue={inputValue.name}
                                    onInputChange={(event, name) => {handleChangeInputStoreValue({property: 'name', value: name})}}
                                    options={storeList.map(store => store.name)}
                                    sx={{ width: '250px' }}
                                    renderInput={(params) => {
                                        return <TextField {...params} />
                                    }}
                                    disabled={!editing}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                Teléfono
                            </Typography>
                            <Typography
                                variant='p'
                                gutterBottom
                                align='right'
                            >
                                {storeSelected.phone}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                variant='p'
                                gutterBottom
                            >
                                Dirección
                            </Typography>
                            <Typography
                                variant='p'
                                gutterBottom
                                align='right'
                            >
                                {storeSelected.place}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <IconButton
                                onClick={handleEditing}
                            >
                                {
                                    editing ? (
                                        <CheckIcon />
                                    ) : (
                                        <EditIcon />
                                    )
                                }
                            </IconButton>
                        </Box>
                    </>
                ) : null
            }
        </>
    )
}

export default StoreData