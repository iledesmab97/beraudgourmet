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
                        placeholder={'Nombre'}
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
                        placeholder={'Ciudad'}
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
                        placeholder={'Teléfono'}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                container
                justifyContent={'space-between'}
                alignItems={'baseline'}
                spacing={2}
            >
                <Grid item xs={12} sm={2}>
                    <Typography
                        sx={{
                            textAlign: {
                                xs: 'left',
                                sm: 'right'
                            }
                        }}
                    >
                        Coordenadas:
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    xs
                    spacing={1}
                    direction={{
                        xs:'column',
                        sm:'row'
                    }}
                    justifyContent={'flex-end'}
                    alignItems={'center'}
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
                            placeholder={'latitud'}
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
                            placeholder={'longitud'}
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
                        placeholder={'Dirección'}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StoreData