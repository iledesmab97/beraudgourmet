import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useState, useEffect } from 'react'
import useGetStoreList from '@/hooks/useGetStoreList'

import { listStores } from '@/utils/preparingData'

function SelectStore({ store, updateStore }) {

    const { storeList } = useGetStoreList()
    const [ stores, setStores] = useState([])

    useEffect(() => {
        setStores(listStores(storeList))
    }, [storeList])

    function handleChangeStore(event) {
        const {value} = event.target
        const newStore = stores.find(store  => store.name === value)
        updateStore(newStore)
    }

    return (
        <Grid item container spacing={3}>
            <Grid item xs={12}>
                <Typography
                    variant='title'
                >
                    Tienda
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Tiendas</InputLabel>
                    <Select
                        label='Tiendas'
                        value={store ? store.name : ''}
                        onChange={handleChangeStore}
                    >
                        {
                            stores.map(store => (
                                <MenuItem key={store.name} value={store.name} >{store.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>        
    )
}

export default SelectStore