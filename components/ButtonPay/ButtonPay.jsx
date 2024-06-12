'use client'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import useGetModal from '@/hooks/useGetModal'
import useCanPay from '@/hooks/useCanPay'

const textHelperText = {
    user: 'Aún no hay un usuario registrado',
    orders: 'No se ha hecho ningún pedido',
    place: 'No se ha indicado un lugar de entrega',
    time: 'El tiempo indicado está fuera del rango permitido'
}

function ButtonPay() {

    const { handleOpenModal } = useGetModal({modalType: 'pay'})
    const { canPay, missing, whatDataMissing } = useCanPay()

    return (
        <FormControl fullWidth>
            <Button
                variant='contained'
                color='secondary'
                sx={{ my:1 }}
                fullWidth
                disabled={!canPay}
                onClick={() => {
                    if (!whatDataMissing()) handleOpenModal('pay')
                }}
            >
                Pagar
            </Button>
            <FormHelperText sx={{ textAlign: 'center' }}>{ missing ? textHelperText[missing] : missing }</FormHelperText>
        </FormControl>
    )
}

export default ButtonPay