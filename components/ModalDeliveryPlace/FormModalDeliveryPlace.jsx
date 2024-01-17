'use client'

import useGetPlace from '@/hooks/useGetPlace'
import useGetModal from '@/hooks/useGetModal'
import places from '@/typePlaces.json'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TextArea from '../TextArea/TextArea'
import ItemPlace from '../PlaceFinder/ItemPlace'

export default function FormModalDeliveryPlace ({ inputsHome, handleInputsHome, typeLocation, handleTypeLocation, closerStore, currentModal }) {

    const { handleCloseModal } = useGetModal({modalType: 'place'})
    const { handleAddPlace, handleTypeDelivery } = useGetPlace()

    return (
        <Grid
            container
            spacing={2}
            direction='column'
        >
            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        md={3}
                        sx={{
                            pr: 3
                        }}
                    >
                        Tipo
                    </Typography>
                </Grid>
                <Grid item md>
                    <FormControl fullWidth>
                        <InputLabel id='type-place-label'>Tipo de residencia</InputLabel>
                        <Select
                            labelId='type-place'
                            id='type-place-select'
                            value={typeLocation.name}
                            label='Tipo de residencia'
                            onChange={handleTypeLocation}
                        >
                            <MenuItem value='home'>Casa: Dirección residencial</MenuItem>
                            <MenuItem value='work'>Trabajo: Dirección comercial</MenuItem>
                            <MenuItem value='building'>Casa: Departament</MenuItem>
                            <MenuItem value='other'>Hotel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {
                inputsHome.other && Object.keys(inputsHome.other).length
                    ? (
                        <Grid container item alignItems='center'>
                            <Grid item md={3}>    
                                <Typography
                                    id="modal-modal-title"
                                    variant='p'
                                    component="h2"
                                    align='right'
                                    sx={{
                                        pr: 3
                                    }}
                                >
                                    {places[inputsHome.type.name].other.name}
                                </Typography>
                            </Grid>

                            {
                                Object.keys(inputsHome.other).length && (
                                    <Grid item md>
                                        {
                                            Object.keys(inputsHome.other).map((input, index) => (
                                                <TextField
                                                    id='input-unidad'
                                                    variant='outlined'
                                                    placeholder={places[inputsHome.type.name].other.inputs[index].nameES}
                                                    key={input + index}
                                                    name={input}
                                                    value={inputsHome.other[input]}
                                                    onChange={handleInputsHome}
                                                    sx={{
                                                        width: `${places[inputsHome.type.name].other.inputs[index].width}%`
                                                    }}
                                                />        
                                            ))
                                        }
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                    : null
            }

            <Grid container item alignItems='center'>
                <Grid item md={3}>    
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Calle
                    </Typography>
                </Grid>

                <Grid item md>
                    {
                        Object.keys(inputsHome.street).map((input, index) => (
                            <TextField
                                id='input-unidad'
                                variant='outlined'
                                placeholder={places[inputsHome.type.name].street[index].nameES}
                                name={input}
                                onChange={handleInputsHome}
                                value={inputsHome.street[input]}
                                sx={{
                                    width: `${places[inputsHome.type.name].street[index].width}%`
                                }}
                                key={input + index}
                            />
                        ))
                    }
                </Grid>
            </Grid>

            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Pueblo/Ciudad
                    </Typography>
                </Grid>

                <Grid item md>
                    <TextField
                        id='input-unidad'
                        variant='outlined'
                        name='city'
                        onChange={handleInputsHome}
                        value={inputsHome.city}
                        sx={{
                            width: '70%'
                        }}
                    />
                    <TextField
                        id='input-unidad'
                        variant='outlined'
                        placeholder={typeLocation.city.postal}
                        name='postalCode'
                        onChange={handleInputsHome}
                        value={inputsHome.postalCode}
                        sx={{
                            width: '30%'
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container item alignItems='center'>
                <Grid item md={3}>
                    <Typography
                        id="modal-modal-title"
                        variant='p'
                        component="h2"
                        align='right'
                        sx={{
                            pr: 3
                        }}
                    >
                        Nota
                    </Typography>
                </Grid>

                <Grid item md>
                    <TextArea
                        minRows={3}
                        maxRows={3}
                        // placeholder='Minimun 3 rows'
                        aria-label='minimum height'
                        onChange={handleInputsHome}
                        value={inputsHome.note}
                        name='note'
                    />
                </Grid>
            </Grid>
            <Button
                variant='contained'
                onClick={() => {
                    handleAddPlace({inputsHome, closerStore})
                    handleTypeDelivery({name: 'home', totalName: 'Entrega a domicilio'})
                    handleCloseModal(currentModal)
                }}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 40,
                    alignSelf: 'flex-end',
                    mt: 2
                }}
            >Agregar</Button>
        </Grid>
    )
} 