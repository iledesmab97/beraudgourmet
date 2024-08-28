import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'
import { listStores } from '@/hooks/useGetStoreList'
import useGetProducts from '@/hooks/useGetProducts'

import { getAllUsers } from '@/services/userApi'

function OrderData({ orderData, handleOrderData }) {

    const [userList, setUserList] = useState([])
    const [userSelected, setUserSelected] = useState({})
    const { storeList } = useGetStoreList()
    const [storeListArray, setStoreListArray] = useState(listStores(storeList))
    const [storeSelected, setStoreSelected] = useState({})
    const { products } = useGetProducts({ type:'pizzas' })
    const [pizzaList, setPizzaList] = useState( products ? products : [])
    const [pizzaSelected, setPizzaSelected] = useState({})

    useEffect(() => {
        getAllUsers().then(data => setUserList(data))
    }, [])

    useEffect(() => {
        setStoreListArray(listStores(storeList))
    }, [storeList])

    useEffect(() => {
        if (!products) return
        setPizzaList(products)
    }, [products])

    useEffect(() => {
        console.log('pizzaSelected:', pizzaSelected)
    }, [pizzaSelected])

    function changeUser(userEmail) {
        const newUserSelected = userList.find(user => user.email === userEmail) || {}
        setUserSelected(newUserSelected)
    }

    function changeStore(storeName) {
        const newStoreSelected = storeListArray.find(store => store.name === storeName) || {}
        setStoreSelected(newStoreSelected)
    }

    function changePizza(pizzaName) {
        const newPizzaSelected = pizzaList.find(pizza => pizza.name === pizzaName) || {}
        setPizzaSelected(newPizzaSelected)
    }

    return (
        <Box
            sx={{
                width: '100%'
            }}
        >
            <Typography variant='title'>DATOS DE ORDEN</Typography>

            <FormControl
                fullWidth
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <FormLabel labelPlacement="start">Usuario:</FormLabel>
                    <Autocomplete
                        value={userSelected.email}
                        onChange={(event, newValue) => changeUser(newValue)}
                        options={userList.map(user => user.email)}
                        renderInput={(params) => <TextField {...params} label="Email" />}
                        sx={{
                            width: '300px'
                        }}
                    />
                </Box>

                <Divider sx={{ width: '100%'}} />

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <FormLabel labelPlacement="start">Tienda:</FormLabel>
                    <Autocomplete
                        value={storeSelected.name}
                        onChange={(event, newValue) => changeStore(newValue)}
                        options={storeListArray.map(store => store.name)}
                        renderInput={(params) => <TextField {...params} label="Tienda" />}
                        sx={{
                            width: '300px'
                        }}
                    />
                </Box>

                <Divider sx={{ width: '100%'}} />
                
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px'
                    }}
                >
                    <FormLabel labelPlacement="start">Pizza:</FormLabel>
                    <Autocomplete
                        value={pizzaSelected.name}
                        onChange={(event, newValue) => changePizza(newValue)}
                        options={pizzaList.map(pizza => pizza.name)}
                        renderInput={(params) => <TextField {...params} label="Pizza" />}
                        sx={{
                            width: '300px'
                        }}
                    />
                </Box>
            </FormControl>

        </Box>
    )
}

export default OrderData