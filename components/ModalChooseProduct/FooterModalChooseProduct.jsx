import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function FooterModalChooseProduct({handleQuantity, quantity, edit, handleAddOrder, currentProduct, handleCloseModalOrder, handleUpdateOrder, nextStep}) {
    return (
        <Grid
            container
            direction={{
                xs: 'column',
                sm: 'row'
            }}
            justifyContent={{
                xs: 'center',
                sm: 'space-between'
            }}
            alignItems={{
                xs: 'flex-start',
                sm: 'center'
            }}
            spacing={1}
            wrap='nowrap'
            sx={{
                height: {
                    xs: '15%',
                    sm: '10%'
                },
                pr: {
                    xs: 2,
                    sm: 4
                },
                pl: {
                    xs: 2,
                    sm: 4
                }
            }}
        >
            <Grid
                item
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center'
                }}
            >
                <Button
                    size='small'
                    variant='contained'
                    name='-'
                    onClick={handleQuantity}
                    disabled={quantity == 1}
                >
                    -
                </Button>
                <Typography
                    id="modal-modal-description"
                    // sx={{ mt: 2 }}
                >
                    {quantity}
                </Typography>
                <Button
                    size='small'
                    variant='contained'
                    name='+'
                    onClick={handleQuantity}
                >
                    +
                </Button>
                <Typography id="modal-modal-description" sx={{ ml: 5 }}>
                    ${currentProduct.totalPrice}
                </Typography>
            </Grid>
            <Grid
                item
            >
                <Button
                    variant='contained'
                    onClick={() => {
                        if (edit) {
                            handleUpdateOrder({item: currentProduct, index: edit.index})
                        } else {
                            handleAddOrder(currentProduct)
                        }
                        handleCloseModalOrder()
                        nextStep('order')
                    }}
                >
                    {edit ? 'Actualizar' : 'Agregar'}
                </Button>
            </Grid>
        </Grid>
    )
}