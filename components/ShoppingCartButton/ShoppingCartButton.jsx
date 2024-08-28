import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useGetOrders from '@/hooks/useGetOrders'
import useCanPay from '@/hooks/useCanPay'
import useGetModal from '@/hooks/useGetModal'

function ShoppingCartButton({ toggleOpenOrderRewards }) {

    const { orders } = useGetOrders()
    const { canPay } = useCanPay()
    const { handleOpenModal } = useGetModal({modalType: 'pay'})

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
                            onClick={() => { canPay ? handleOpenModal('pay') : openOrderRegards()}}
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