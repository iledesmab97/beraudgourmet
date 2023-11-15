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
import menuStore from '@/menuStore.json'
import masses from '@/masses.json'

export default function CustomizePizza ({ name, ingredientsProduct, customizePizza, currentProduct }) {

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
        <Grid
            item
            md
            // xs
            // xs={12}
            pr={4}
            sx={{ height: '85%'}}
        >
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >

                <Typography
                    id="modal-modal-description"
                    variant='title'
                    sx={{ mt: 2 }}
                >
                    ELIGE EL TAMAÑO
                </Typography>

                <ButtonGroup
                    size='large'
                    variant='contained'
                    aria-label="contained large button group"
                    sx={{
                        // width: 216
                        width: 'fit-content'
                    }}
                >
                    <Button
                        onClick={handleSize}
                        value={'12"'}
                        sx={size === '12"'
                            ? {
                                backgroundColor: 'rgb(28, 58, 93)'
                            } : {}}
                    >
                        {'12"'}
                    </Button>
                    <Button
                        onClick={handleSize}
                        value={'14"'}
                        sx={size === '14"'
                            ? {
                                backgroundColor: 'rgb(28, 58, 93)'
                            } : {}}
                    >
                        {'14"'}
                    </Button>
                    <Button
                        onClick={handleSize}
                        value={'16"'}
                        sx={size === '16"'
                            ? {
                                backgroundColor: 'rgb(28, 58, 93)'
                            } : {}}
                    >
                        {'16"'}
                    </Button>
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
                        // sx={{
                        //     display: 'flex',
                        //     flexDirection: 'column',
                        //     gap: 1
                        // }}
                    >
                        <Grid
                            container
                            direction='row'
                            justifyContent="space-between"
                            columns={{ sm:12, md:24}}
                        >
                            {
                                Object.keys(currentProduct.price[size]).map((typeMass, index) => (
                                    <Grid
                                        key={typeMass + index}
                                        item
                                        sm={12}
                                        md={11}
                                        mt={1}
                                        // container
                                        // direction='column'
                                        // justifyContent='flex-start'
                                        // alignItems='flex-start'
                                        sx={ {
                                            minWidth: '49%',
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.1)'
                                            }
                                        }}
                                        // xs={5.5}
                                    >
                                        <Box
                                            sx={{
                                                component: 'div',
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <FormControlLabel
                                                // key={typeMass + index}
                                                value={typeMass}
                                                control={
                                                    <Radio
                                                        checked={mass === typeMass ? true : false}
                                                    />}
                                                label={
                                                    // <Box
                                                    //     component={'div'}
                                                    //     sx={{
                                                    //         display: 'flex',
                                                    //         flexDirection: 'column',
                                                    //         width: '100%'
                                                    //     }}
                                                    // >
                                                        // <Box
                                                        //     // component={'div'}
                                                        //     sx={{
                                                        //         width: '100%',
                                                        //         display: 'flex',
                                                        //         justifyContent: 'space-between',
                                                        //         // alignItems: ''
                                                        //     }}
                                                        // >
                                                            <Typography
                                                                variant='p'
                                                                sx={{
                                                                    width: 'inline',
                                                                    fontWeight: 400
                                                                }}
                                                            >
                                                                {typeMass}
                                                            </Typography>
                                                        // </Box>
                                                }
                                                sx={ mass === typeMass
                                                    ? {
                                                        width: '100%',
                                                        height: '100%',
                                                        mt: 1,
                                                        borderRadius: '10px',
                                                        margin: 0,
                                                        // width: 'fit-content',
                                                        // width: '100%',
                                                        // backgroundColor: 'rgba(0,0,0,0.1)',
                                                        px: 2,
                                                        pl: 0,
                                                        py: 1,
                                                        // '&:hover': {
                                                        //     backgroundColor: 'rgba(0,0,0,0.1)'
                                                        // }   
                                                    } : {
                                                        width: '100%',
                                                        height: '100%',
                                                        mt: 1,
                                                        borderRadius: '10px',
                                                        margin: 0,
                                                        // width: 'fit-content',
                                                        px: 2,
                                                        pl: 0,
                                                        py: 1,
                                                        // '&:hover': {
                                                        //     backgroundColor: 'rgba(0,0,0,0.1)'
                                                        // }   
                                                    }
                                                }
                                            />
                                            <Typography
                                                id="modal-modal-description"
                                                // variant='title'
                                                sx={{
                                                    width: 'inline',
                                                    paddingRight: 1
                                                }}
                                            >
                                                ${currentProduct.price[size][typeMass]}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant='miniature'
                                            component='p'
                                            sx={{
                                                // width: '100%'
                                                // padding: 1,
                                                paddingTop: 0
                                            }}
                                        >
                                            {masses[typeMass].text}
                                        </Typography>
                                    </Grid>
                                ))    
                            }
                        </Grid>
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
                                sx={ingredientsModal.includes(ingredient) ? {textDecoration: 'line-through'} : {}}
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

                <Grid
                    container
                    direction='row'
                    sx={{
                        justifyContent: 'start'
                    }}
                >
                    <Grid
                        item
                        xs={11}
                    >
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
                                        // sx={{
                                        //     display: 'flex',
                                        //     alignItems: 'center' 
                                        // }}
                                    >
                                        <TableCell
                                            sx={{
                                                display: 'flex',
                                                gap: 1,
                                                alignItems: 'center' 
                                            }}
                                        >
                                            <Button
                                                size='small'
                                                variant='contained'
                                                onClick={handleExtra}
                                                name='-'
                                                value={ingredient.name}
                                                disabled={ extra[ingredient.name] === 0 || extra[ingredient.name] === undefined ? true : false}
                                                // sx={{
                                                //     width: '10px',
                                                //     height: '20px',
                                                //     borderRadius: '50%'
                                                // }}
                                            >
                                                -
                                            </Button>
                                            <Typography id="modal-modal-description">
                                                { extra[ingredient.name] ? extra[ingredient.name] : 0 }
                                            </Typography>
                                            <Button
                                                size='small'
                                                variant='contained'
                                                onClick={handleExtra}
                                                name='+'
                                                value={ingredient.name}
                                            >
                                                +
                                            </Button>
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