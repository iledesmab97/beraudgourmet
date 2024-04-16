'use client'

import { useState, useEffect } from 'react'
import { scrollToSection, showScrollPosition } from '@/utils/modal'
import ButtonGroupPizza from '@/components/ButtonGroupPizza/ButtonGroupPizza'
import MasaTypesPizza from '@/components/MasaTypesPizza/MasaTypesPizza'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'

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
import IconButton from '@mui/material/IconButton'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import Link from '@mui/material/Link';

import menuStore from '@/menuStore.json'
import masses from '@/masses.json'



export default function CustomizePizza ({ name, ingredientsProduct, customizePizza, currentProduct }) {

    const [visibilityArrow, setVisibilityArrow] = useState(true)
    const { extraIngredients } = useGetExtraIngredients()

    useEffect(() => {
        const container = document.querySelector('#modal-container-customizePizza')
        container.addEventListener('scroll', handleVisibilityArrow)

        return () => {
            container.removeEventListener('scroll', handleVisibilityArrow)
        }
    }, [])

    function handleVisibilityArrow() {
        const { vertical } = showScrollPosition('#modal-container-customizePizza')
        setVisibilityArrow(vertical === 0 ? true : false)
    }

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
            sx={{
                height: '85%'
            }}
        >
            <Box
                id='modal-container-customizePizza'
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

                <ButtonGroupPizza handleClick={handleSize} size={size} listSizes={Object.keys(currentProduct.price)} />

                <Typography
                    id="modal-subtitle-ELIGE_LA_MASA"
                    variant='title'
                    sx={{ mt: 2 }}>
                    ELIGE LA MASA
                </Typography>

                <MasaTypesPizza listMass={currentProduct.price[size]} mass={mass} handleMass={handleMass} />
            
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
                    id="modal-subtitle-AGREGAR_INGREDIENTES"
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
                                Object.values(extraIngredients).map((ingredient) => {
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
                                                onClick={() => { handleExtra({ingredient, operation: '-'}) }}
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
                                                onClick={() => { handleExtra({ingredient, operation: '+'}) }}
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
                                            {'$' + ingredient.totalPrice}
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
                {
                    visibilityArrow
                    ? (
                        <IconButton
                            onClick={() => {scrollToSection('#modal-subtitle-ELIGE_LA_MASA')}}
                            sx={{
                                position: 'fixed',
                                bottom: '50px',
                                right: '30px',
                                width: 'fit-content'
                            }}
                        >
                            <ArrowDropDownCircleIcon color='primary' />
                        </IconButton>
                    ): null
                }
            </Box>
        </Grid>
    )
}