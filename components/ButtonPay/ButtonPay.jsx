'use client'

import useGetModal from '@/hooks/useGetModal'
import useCanPay from '@/hooks/useCanPay'

import Button from '@mui/material/Button'

function ButtonPay() {

    const { handleOpenModal } = useGetModal({modalType: 'pay'})
    const { canPay } = useCanPay()

    return (
        <Button
            variant='contained'
            color='secondary'
            sx={{ my:1 }}
            fullWidth
            disabled={!canPay}
            onClick={() => {
                handleOpenModal('pay')
            }}
        >
            Pagar
        </Button>
    )
}

export default ButtonPay