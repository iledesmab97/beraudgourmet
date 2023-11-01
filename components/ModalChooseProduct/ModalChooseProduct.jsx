'use client'

import Image from 'next/image'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead';

import items from '../ContainerItems/menuStore.json'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 960,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
  borderRadius: 5
};

const INGREDIENTES = [
  {
    name: 'Aceitunas',
    price: '$25'
  },
  {
    name: 'Champiñon',
    price: '$25'
  },
  {
    name: 'Jalapeño',
    price: '$25'
  },
  {
    name: 'Cebolla',
    price: '$25'
  },
  {
    name: 'Chorizo',
    price: '$25'
  },
  {
    name: 'Jamón',
    price: '$25'
  },
]

export default function ModalChooseProduct() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color='success' variant='contained'>Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            spacing={4}
            sx={{
              width: '100%',
              height: '100%',
              marginTop: 0,
              marginLeft: 0,
            }}>

            <Grid item xs={5} sx={{ height: '85%'}}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: 3/2
                }}
              >
                <Image src={items[0].image} alt='Pizza Margarita' fill/>
              </Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Acá viene todo el texto relacionado con la pizza, como su procedencia, los ingredientes, la receta, etc.
              </Typography>

            </Grid>

            <Grid item xs={7} sx={{ height: '85%'}}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  overflowY: 'scroll',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Button
                  onClick={handleClose}
                  size='large'
                  sx={{
                    color: 'black',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: 0,
                    right: -10
                  }}
                >
                  X
                </Button>

                <Typography
                  id="modal-modal-title"
                  variant='title'
                  component="h2">
                  All The Meats
                </Typography>

                <ButtonGroup
                  size='large'
                  variant='contained'
                  aria-label="contained large button group"
                  sx={{
                    width: 216
                  }}
                >
                  <Button>{"12''"}</Button>
                  <Button>{"14''"}</Button>
                  <Button>{"16''"}</Button>
                  {/* <Button>{"18''"}</Button> */}
                </ButtonGroup>

                <Typography
                  id="modal-modal-description"
                  variant='title'
                  sx={{ mt: 2 }}>
                  ELIGE LA MASA
                </Typography>
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label">ELIGE LA MASA</FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Masa Tradicional" control={<Radio />} label="Masa Tradicional" />
                    <FormControlLabel value="Masa Orilla de Queso" control={<Radio />} label="Masa Orilla de Queso" />
                    <FormControlLabel value="Masa Estilo New York" control={<Radio />} label="Masa Estilo New York" />
                    <FormControlLabel value="Masa Costra de Queso" control={<Radio />} label="Masa Costra de Queso" />
                  </RadioGroup>
                </FormControl>
                
                <Typography
                  id="modal-modal-description"
                  variant='title'
                  sx={{ mt: 2 }}>
                  QUITAR INGREDIENTES
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked/>} label='Ingrediente 1'/>
                  <FormControlLabel control={<Checkbox defaultChecked/>} label='Ingrediente 2'/>
                  <FormControlLabel control={<Checkbox defaultChecked/>} label='Ingrediente 3'/>
                  <FormControlLabel control={<Checkbox defaultChecked/>} label='Ingrediente 4'/>
                </FormGroup>

                <Typography
                  id="modal-modal-description"
                  variant='title'
                  sx={{ mt: 2 }}>
                  AGREGAR INGREDIENTES
                </Typography>
                <Grid container direction='row'>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        size='small'
                        // dense={true}
                        // table
                      >
                        {/* <TableHead>
                          <TableRow>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                          </TableRow>
                        </TableHead> */}
                        <TableBody>
                          {
                            INGREDIENTES.map(ingrediente => {
                              return (
                                <TableRow
                                  key={ingrediente.name}
                                >
                                  <TableCell sx={{ display: 'flex', gap: 1 }}>
                                    <Button size='small' variant='contained'>-</Button>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                      0
                                    </Typography>
                                    <Button size='small' variant='contained'>+</Button>
                                  </TableCell>
                                  <TableCell>
                                    {ingrediente.name}
                                  </TableCell>
                                  <TableCell>
                                    {ingrediente.price}
                                  </TableCell>                                
                                </TableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>

            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems="center"
              sx={{
                height: '15%',
                py: 1,
                px: 5
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                <Button size='small' variant='contained'>-</Button>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  0
                </Typography>
                <Button size='small' variant='contained'>+</Button>
                <Typography id="modal-modal-description" sx={{ ml: 5 }}>
                  $0
                </Typography>
              </Box>
              <Button variant='contained'>Agregar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}