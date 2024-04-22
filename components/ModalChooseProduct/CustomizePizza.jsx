'use client'

import { useState, useEffect } from 'react'
import { scrollToSection, showScrollPosition } from '@/utils/modal'
import ButtonGroupPizza from '@/components/ButtonGroupPizza/ButtonGroupPizza'
import MasaTypesPizza from '@/components/MasaTypesPizza/MasaTypesPizza'
import useGetExtraIngredients from '@/hooks/useGetExtraIngredients'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

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
import Link from '@mui/material/Link'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'

import menuStore from '@/menuStore.json'
import masses from '@/masses.json'



export default function CustomizePizza ({ name, ingredientsProduct, customizePizza, currentProduct }) {

    const [visibilityArrow, setVisibilityArrow] = useState(true)
    const { extraIngredients } = useGetExtraIngredients()
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

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

    useEffect(() => {
        const idContainer = isLargeScreen ? '#modal-container-customizePizza' : '#container-modal-order-pizza'
        const container = document.querySelector(idContainer)
        container.addEventListener('scroll', handleVisibilityArrow)

        return () => {
            container.removeEventListener('scroll', handleVisibilityArrow)
        }
    }, [])

    function handleVisibilityArrow() {
        const idContainer = isLargeScreen ? '#modal-container-customizePizza' : '#container-modal-order-pizza'
        const { vertical } = showScrollPosition(idContainer)
        setVisibilityArrow(vertical === 0 ? true : false)
    }

    return (
        <Grid
            id='modal-container-customizePizza'
            item
            container
            md
            direction={'column'}
            wrap='nowrap'
            alignItems={'flex-start'}
            spacing={2}
            sx={{
                height: {
                    xs: 'auto',
                    md: '85%'
                },
                overflowY: {
                    xs: 'hidden',
                    md: 'auto'
                }
            }}
        >
            <Grid
                item
                container
                direction={'column'}
                spacing={1}
            >
                <Grid item>
                    <Typography
                        id="modal-modal-description"
                        variant='title'
                    >
                        ELIGE EL TAMAÑO
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroupPizza handleClick={handleSize} size={size} listSizes={Object.keys(currentProduct.price)} />
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction={'column'}
                alignItems={'flex-start'}
                wrap='nowrap'
                spacing={1}
            >
                <Grid item>
                    <Typography
                        id="modal-subtitle-ELIGE_LA_MASA"
                        variant='title'
                    >
                        ELIGE LA MASA
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        width: '95%'
                    }}
                >
                    <MasaTypesPizza listMass={currentProduct.price[size]} mass={mass} handleMass={handleMass} />
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction={'column'}
                spacing={1}
            >
                <Grid item>
                    <Typography
                        id="modal-modal-description"
                        variant='title'
                    >
                        QUITAR INGREDIENTES
                    </Typography>
                </Grid>
                <Grid item>
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
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction={'column'}
                alignItems={'flex-start'}
                wrap='nowrap'
                spacing={{
                    xs: 0,
                    sm: 1
                }}
            >
                <Grid item>
                    <Typography
                        id="modal-subtitle-AGREGAR_INGREDIENTES"
                        variant='title'
                    >
                        AGREGAR INGREDIENTES
                    </Typography>
                </Grid>

                <Grid
                    item
                    sx={{
                        width: '100%'
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: '95%'
                        }}
                    >
                        <Table
                            size='small'
                        >
                        <TableBody>
                            {
                            Object.values(extraIngredients).map((ingredient) => {
                                return (
                                <TableRow
                                    key={ingredient.name}
                                    sx={{
                                        borderBottom: '1px solid rgba(224, 224, 224, 1)'
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            px: {
                                                xs: 1,
                                            },
                                            borderBottom: 'none'
                                        }}
                                    >
                                        <IconButton
                                            size='small'
                                            variant='contained'
                                            onClick={() => { handleExtra({ingredient, operation: '-'}) }}
                                            name='-'
                                            value={ingredient.name}
                                            disabled={ extra[ingredient.name] === 0 || extra[ingredient.name] === undefined ? true : false}
                                            sx={{
                                                scale: {
                                                    xs: '0.65',
                                                    md: '0.70'
                                                },
                                                bgcolor: '#295386',
                                                color: '#FFFDFF',
                                                '&:hover': {
                                                    color: '#295386'
                                                }
                                            }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography id="modal-modal-description">
                                            { extra[ingredient.name] ? extra[ingredient.name] : 0 }
                                        </Typography>
                                        <IconButton
                                            size='small'
                                            onClick={() => { handleExtra({ingredient, operation: '+'}) }}
                                            name='+'
                                            value={ingredient.name}
                                            sx={{
                                                scale: {
                                                    xs: '0.65',
                                                    md: '0.70'
                                                },
                                                bgcolor: '#295386',
                                                color: '#FFFDFF',
                                                '&:hover': {
                                                    color: '#295386'
                                                }
                                            }}
                                        >
                                            <AddIcon />
                                            {/* + */}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            px: {
                                                xs: 1,
                                                sm: 2
                                            }
                                        }}
                                    >
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
                                bottom: '76px',
                                right: {
                                    xs: '16px',
                                    sm: '32px',
                                    md: '48px'
                                },
                                width: 'fit-content'
                            }}
                        >
                            <ArrowDropDownCircleIcon color='primary' />
                        </IconButton>
                    ): null
                }
        </Grid>
    )
}