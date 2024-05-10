import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useGetOrders from '@/hooks/useGetOrders'

function ShoppingCartButton({ toggleOpenOrderRewards }) {

    const { orders } = useGetOrders()

    function openOrderRegards() {
        toggleOpenOrderRewards(true)
    }

    return (
        <>
            {
                orders && orders.length ? (
                    <Fab
                        sx={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            bgcolor: '#295386'
                        }}
                    >
                        <IconButton
                            onClick={openOrderRegards}
                            sx={{
                                color: 'rgba(255, 255, 255, 1)',
                                '&:hover': {
                                    color: '#295386',
                                    bgcolor: 'transparent',
                                }
                            }}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Fab>
                ) : null
            }
        </>
    )
}

export default ShoppingCartButton