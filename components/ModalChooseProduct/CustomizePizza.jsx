'use client'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
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

import totalIngredients from '@/ingredients.json'

export default function CustomizePizza ({ name, ingredientsProduct, customizePizza }) {

    const {
        mass,
        handleMass,
        ingredients,
        handleIngredients,
        extra,
        handleExtra
      } = customizePizza

    return (
        <Grid item xs={7} sx={{ height: '85%'}}>
            <Box
            sx={{
                height: '100%',
                width: '100%',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column'
            }}>

            <Typography
                id="modal-modal-title"
                variant='title'
                component="h2">
                {name}
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
                defaultValue="Masa Tradicional"
                name="radio-buttons-group"
                onChange={handleMass}
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
                {
                    ingredientsProduct.map((ingredient, index) => (
                        <FormControlLabel key={ingredient + index} control={<Checkbox defaultChecked/>} label={ingredient} />        
                    ))
                }
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
                    <TableBody>
                        {
                        totalIngredients.map(ingredient => {
                            return (
                            <TableRow
                                key={ingredient.name}
                            >
                                <TableCell sx={{ display: 'flex', gap: 1 }}>
                                <Button size='small' variant='contained'>-</Button>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    0
                                </Typography>
                                <Button size='small' variant='contained'>+</Button>
                                </TableCell>
                                <TableCell>
                                {ingredient.name}
                                </TableCell>
                                <TableCell>
                                {ingredient.price}
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
    )
}