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
        size,
        handleSize,
        mass,
        handleMass,
        ingredientsModal,
        handleIngredientsModal,
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
                <Button onClick={handleSize} value={'12"'}>{'12"'}</Button>
                <Button onClick={handleSize} value={'14"'}>{'14"'}</Button>
                <Button onClick={handleSize} value={'16"'}>{'16"'}</Button>
                {/* <Button onClick={handleSize} value={'18"'}>{'18"'}</Button> */}
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
                // defaultValue="Masa Tradicional"
                name="radio-buttons-group"
                onChange={handleMass}
                >
                <FormControlLabel value="Masa Tradicional" control={<Radio checked={mass === "Masa Tradicional" ? true : false} />} label="Masa Tradicional" />
                <FormControlLabel value="Masa Orilla de Queso" control={<Radio checked={mass === "Masa Orilla de Queso" ? true : false} />} label="Masa Orilla de Queso" />
                <FormControlLabel value="Masa Estilo New York" control={<Radio checked={mass === "Masa Estilo New York" ? true : false} />} label="Masa Estilo New York" />
                <FormControlLabel value="Masa Costra de Queso" control={<Radio checked={mass === "Masa Costra de Queso" ? true : false} />} label="Masa Costra de Queso" />
                </RadioGroup>
            </FormControl>
            
            <Typography
                id="modal-modal-description"
                variant='title'
                sx={{ mt: 2 }}>
                QUITAR INGREDIENTES
            </Typography>
            <FormGroup onChange={handleIngredientsModal}>
                {
                    ingredientsProduct.map((ingredient, index) => (
                        <FormControlLabel
                            key={ingredient + index}
                            control={
                                <Checkbox
                                    checked={ ingredientsModal.includes(ingredient) ? false : true} 
                                />
                            }
                            label={ingredient}
                        />        
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
                        Object.values(totalIngredients).map(ingredient => {
                            return (
                            <TableRow
                                key={ingredient.name}
                            >
                                <TableCell sx={{ display: 'flex', gap: 1 }}>
                                <Button size='small' variant='contained' onClick={handleExtra} name='-' value={ingredient.name}>-</Button>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    { extra[ingredient.name] ? extra[ingredient.name] : 0 }
                                </Typography>
                                <Button size='small' variant='contained' onClick={handleExtra} name='+' value={ingredient.name}>+</Button>
                                </TableCell>
                                <TableCell>
                                {ingredient.name}
                                </TableCell>
                                <TableCell>
                                {'$' + ingredient.price}
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