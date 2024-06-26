import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import { useState, useEffect } from 'react'
import useGetProducts from '@/hooks/useGetProducts'
import useGetModal from '@/hooks/useGetModal'

function PizzaCustomizable() {

    const { products } = useGetProducts({type:'pizzas'})
    const [customizablePizza, setCustomizablePizza] = useState(null)
    const { handleOpenModalOrder } = useGetModal({modalType:'order'})
    
    useEffect(() => {
        if ( !products || !products.length ) return
        const newCustomizablePizza = products.find(pizza => pizza.type === 'customizable')
        if (!newCustomizablePizza) return
        setCustomizablePizza(newCustomizablePizza)
    }, [products])

    return (
        <Grid item container xs={12} >
            <Grid
                item
                container
                xs={12}
                component={Paper}
                elevation={5}
                sx={{
                    height: '350px',
                    borderRadius: '20px'
                }}
            >
                {
                    customizablePizza ? (
                        <>
                            <Grid item xs sx={{ maxHeight: '100%' }} >
                                <CardMedia
                                    component={'img'}
                                    alt='Titulo de la pizza'
                                    sx={{
                                        position: 'relative',
                                        top: 32,
                                        height: '100%',
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
                                        <Typography variant='encabezado' >{customizablePizza.name}</Typography>
                                        <Typography variant='p' >{customizablePizza.text}</Typography>
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
                                    <CardActions
                                        sx={{
                                            height: '80%',
                                            width: '100%'
                                        }}
                                    >
                                        <Button
                                            onClick={ () => { handleOpenModalOrder({item: customizablePizza }) }}
                                            variant='contained'
                                            sx={{
                                                height: '100%',
                                                width: '100%'
                                            }}
                                        >
                                            Empieza aquí
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </>
                    ) : null
                }                            
            </Grid>
        </Grid >
    )
}

export default PizzaCustomizable