import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Paper from '@mui/material/Paper'

import { useState, useEffect } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetModal from '@/hooks/useGetModal'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function PizzaCustomizable() {

    const { products } = useGetProducts({type:'pizzas'})
    const [customizablePizza, setCustomizablePizza] = useState(null)
    const { handleOpenModalOrder } = useGetModal({modalType:'order'})
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if ( !products || !products.length ) return
        const newCustomizablePizza = products.find(pizza => pizza.type === 'customizable')
        if (!newCustomizablePizza) return
        setCustomizablePizza(newCustomizablePizza)
    }, [products])

    if (!customizablePizza) return null

    return (
        <Grid item container xs={12} >
            <ButtonBase
                onClick={ () => { handleOpenModalOrder({item: customizablePizza }) }}
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px'
                }}
            >
                <Grid
                    item
                    container
                    xs={12}
                    component={Paper}
                    elevation={10}
                    wrap='nowrap'
                    sx={{
                        height: matches ? '130px' : '350px',
                        borderRadius: '20px',
                        bgcolor: '#295386',
                        position: matches ? 'relative' : 'static',
                        overflow: 'hidden'
                    }}
                >
                    <Grid item xs sx={{ maxHeight: '100%' }} >
                        <CardMedia
                            component={'img'}
                            alt='Titulo de la pizza'
                            sx={{
                                position: 'relative',
                                top: matches ? '-33px' : 32,
                                left: matches ? '-68px' : '0px',
                                height: matches ? '229px' : '100%',
                                width: matches ? 'auto' : '100%',
                                objectFit: 'contain'
                            }}
                            image={customizablePizza.image}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        xs={7}

                        md={8}
                        direction={'column'}
                        sx={{ position: 'relative' }}
                    >
                        <Grid item >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    component={'h1'}
                                    variant='encabezado'
                                    align='center'
                                    sx={{
                                        position: matches ? 'absolute' : 'static',
                                        top: '5px',
                                        left: '-107px',
                                        color: 'white',
                                        fontSize: matches ? '1.4rem' : '2.8rem'
                                    }}
                                >
                                    {customizablePizza.name}
                                </Typography>
                                <Typography
                                    component={'p'}
                                    variant='p'
                                    align='center'
                                    sx={{
                                        position: matches ? 'absolute' : 'static',
                                        top: '48px',
                                        left: '-95px',
                                        color: 'white',
                                        fontSize: matches ? '1rem' : '1.3rem'
                                    }}
                                >
                                    {customizablePizza.text}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                position: 'absolute',
                                bottom: '0px',
                                right: '0px',
                                // width: 'fit-content'
                                width: '100%',
                                height: '200px',
                                p: 2
                            }}
                        >
                            {
                                !matches ? (
                                    <CardActions
                                        sx={{
                                            height: '80%',
                                            width: '100%'
                                        }}
                                    >
                                        <Button
                                            onClick={ () => { handleOpenModalOrder({item: customizablePizza }) }}
                                            sx={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '100px',
                                                bgcolor: '#FFFFFF',
                                                '&:hover': {
                                                    bgcolor: '#4e5762',
                                                    color: '#FFFFFF'
                                                },
                                                fontSize: '1.5rem'
                                            }}
                                        >
                                            Empieza aquí
                                        </Button>
                                    </CardActions>
                                ) : null
                            }
                        </Grid>
                    </Grid>                           
                </Grid>
            </ButtonBase>
        </Grid >
    )
}

export default PizzaCustomizable