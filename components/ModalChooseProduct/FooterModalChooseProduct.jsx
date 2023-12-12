import { accept } from '@/genericFunctions/modal'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function FooterModalChooseProduct({handleQuantity, quantity, totalPrice, edit, handleAddOrder, currentProduct, handleCloseModalOrder, handleAddedItem, handleUpdateOrder}) {
    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems="center"
            item
            xs={12}
            pr={4}
            sx={{
                height: '10%'
            }}
        >
            <Box
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
                    ${totalPrice}
                </Typography>
            </Box>
            <Button
                variant='contained'
                onClick={() => {
                    if (edit) {
                        handleUpdateOrder({item: currentProduct, index: edit.index})
                        handleCloseModalOrder()
                    } else {
                        handleAddOrder(currentProduct)
                        handleAddedItem()
                        handleCloseModalOrder()
                    }
                }}
            >
                {edit ? 'Actualizar' : 'Agregar'}
            </Button>
        </Grid>
    )
}