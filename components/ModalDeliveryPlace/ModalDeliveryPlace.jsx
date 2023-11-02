'use client'

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Input from '@mui/material/Input';
// import { TextareaAutosize } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TextArea from '../TextArea/TextArea'

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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2,
};

export default function ModalDeliveryPlace() {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handlePlace (event) {
    setPlace(event.target.value)
  }

  return (
    <div>
      <Button onClick={handleOpen} color='success' variant='contained'>Lugar de entrega</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                variant='title'
                component="h2"
                align='center'
                sx={{
                    mb: 5
                }}
            >
                Dirección de entrega
            </Typography>

            <TextField
                id="location"
                label="Buscar dirección"
                type='text'
                size='small'
                margin='dense'
                fullWidth
                error={false}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <Grid container>
                <Grid container item>
                    <Grid item md={3}>
                        <Typography
                            id="modal-modal-title"
                            variant='p'
                            component="h2"
                            align='center'
                            sx={{
                                mb: 5
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
                                value={place}
                                label='Tipo de residencia'
                                onChange={handlePlace}
                            >
                                <MenuItem value='home'>Casa: Dirección residencial</MenuItem>
                                <MenuItem value='work'>Trabajo: Dirección comercial</MenuItem>
                                <MenuItem value='building'>Casa: Departament</MenuItem>
                                <MenuItem value='other'>Hotel</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container item>
                    <Grid item md={3}>    
                        <Typography
                            id="modal-modal-title"
                            variant='p'
                            component="h2"
                            align='center'
                            sx={{
                                mb: 5
                            }}
                        >
                            Calle
                        </Typography>
                        
                    </Grid>
                    
                    <Grid item md>
                        <TextField
                            id='input-unidad'
                            variant='outlined'
                            placeholder='Unidad'
                            sx={{
                                width: '18%'
                            }}
                        />
                        <TextField
                            id='input-unidad'
                            variant='outlined'
                            placeholder='Número'
                            sx={{
                                width: '22%'
                            }}
                        />
                        <TextField
                            id='input-unidad'
                            variant='outlined'
                            placeholder='Nombre de la calle'
                            sx={{
                                width: '60%'
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item md={3}>
                        <Typography
                            id="modal-modal-title"
                            variant='p'
                            component="h2"
                            align='center'
                            sx={{
                                mb: 5
                            }}
                        >
                            Pueblo/Ciudad
                        </Typography>
                    </Grid>
                    <Grid item md>
                        <TextField
                            id='input-unidad'
                            variant='outlined'
                            sx={{
                                width: '70%'
                            }}
                        />
                        <TextField
                            id='input-unidad'
                            variant='outlined'
                            placeholder='Código postal'
                            sx={{
                                width: '30%'
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item md={3}>
                        <Typography
                            id="modal-modal-title"
                            variant='p'
                            component="h2"
                            align='center'
                            sx={{
                                mb: 5
                            }}
                        >
                            Nota
                        </Typography>
                    </Grid>
                    <Grid item md>
                        {/* <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            maxRows={6}
                            aria-label='Textarea'
                            placeholder='Escribe tu texto aquí'
                        /> */}
                        <TextArea
                            // sx={{ width: '100%'}}
                            minRows={3}
                            maxRows={7}
                            placeholder='Minimun 3 rows'
                            aria-label='minimum height'
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}