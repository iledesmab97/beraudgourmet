import { useCallback } from 'react'
import useGetSteps from '@/hooks/useGetSteps'
import useGetModal from '@/hooks/useGetModal'
import useGetDrawer from '@/hooks/useGetDrawer'

export default function useHandleShoppingGuide() {

    const { steps } = useGetSteps()
    const { handleOpenModal, handleCloseModal, handleChangeModal, handleCloseModalOrder } = useGetModal({ modalType: 'order' })
    const { handleChangeOpenDrawer } = useGetDrawer()

    const nextStepGuide = useCallback((currentStep) => {
        if ( currentStep !== 'order' && !steps.order ) {
            console.log('necesitas hacer un pedido')
            return handleChangeModal('place', 'order')
        }
        if ( currentStep !== 'store' && !steps.store ) {
            console.log('necesitas indicar un lugar de entrega')
            handleCloseModalOrder()
            return handleOpenModal('place')
        }
        if (!steps.user) {
            console.log('Necesitas iniciar seción')
            handleCloseModal('order')
            handleCloseModal('place')
            return handleChangeOpenDrawer(true)
        }

        console.log('estas listo para pagar')
        handleCloseModal('order')
        handleCloseModal('place')
        return handleChangeOpenDrawer(true)

    }, [steps])

    return { nextStepGuide }

} 