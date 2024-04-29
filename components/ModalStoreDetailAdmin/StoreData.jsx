import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import InputUpdate from '@/components/InputUpdate/InputUpdate'

import { updateStore } from '@/services/storeApi'

function StoreData({ store, updateDataStoreState }) {
    return (
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
                        updateState={updateDataStoreState}
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
                        updateState={updateDataStoreState}
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
                        updateState={updateDataStoreState}
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
                <Grid
                    item
                    // xs={8}
                    container
                    xs
                    spacing={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Grid item xs={2}>
                        <Typography align='right'>Lat:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <InputUpdate
                            value={store.coordinates.lat}
                            updateProperty={updateStore}
                            updateState={updateDataStoreState}
                            properties={{ property: 'lat', id: store.id}}
                            // handleChangeInput={handleChangeInput}
                            // pizzaNew={storeNew}
                            placeholder={'latitud'}
                            // errors={errors?.name}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography align='right'>Lng:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <InputUpdate
                            value={store.coordinates.lng}
                            updateProperty={updateStore}
                            updateState={updateDataStoreState}
                            properties={{ property: 'lng', id: store.id}}
                            // handleChangeInput={handleChangeInput}
                            // pizzaNew={storeNew}
                            placeholder={'longitud'}
                            // errors={errors?.name}
                        />
                    </Grid>
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
                        updateState={updateDataStoreState}
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
    )
}

export default StoreData