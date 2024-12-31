import { useCallback } from "react";
import useGetSteps from "@/hooks/useGetSteps";
import useGetModal from "@/hooks/useGetModal";
import useGetDrawer from "@/hooks/useGetDrawer";

export default function useHandleShoppingGuide() {
    const { steps } = useGetSteps();
    const { handleOpenModal } = useGetModal({ modalType: "order" });
    const { handleChangeOpenDrawer } = useGetDrawer();

    const nextStepGuide = useCallback(
        (currentStep) => {
            if (currentStep !== "order" && !steps.order) {
                return console.log("necesitas hacer un pedido");
            }
            if (currentStep !== "store" && !steps.store) {
                console.log("necesitas indicar un lugar de entrega");
                return handleOpenModal("place");
            }
            if (!steps.user) {
                console.log("Necesitas iniciar seción");
                return handleChangeOpenDrawer(true);
            }

            console.log("estas listo para pagar");
            return handleChangeOpenDrawer(true);
        },
        [steps]
    );

    return { nextStepGuide };
}
