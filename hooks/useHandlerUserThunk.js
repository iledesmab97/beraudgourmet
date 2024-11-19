import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { useRef } from "react";
import { useEffect } from "react";

import { updateAlertMessage } from "@/stores/alertMessage/slice";

import { updateUserAction } from "@/stores/actions/users";

export default function useHandlerUserThunk() {
    const { user, status, error } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const alertText = useRef({
        text: "",
        property: null,
    });

    // Active AlertMessage component and refres order table
    useEffect(() => {
        if (status === "loading" || alertText.current.text === "") return;
        console.log("logré pasar el condicional");
        dispatch(
            updateAlertMessage({
                checked: true,
                text: status === "succeeded" ? alertText.current.text : error,
                status: status === "succeeded" ? "success" : "error",
            })
        );
        console.log("ya despache el updateAlertMessage");
        alertText.current = {
            text: "",
            property: null,
        };
    }, [status]);

    function updateUser({ property, value }) {
        switch (property) {
            case "name": {
                alertText.current = {
                    text: "El nombre se ha actualizado exitosamente",
                    property: "name",
                };

                break;
            }
            case "numberPhone": {
                alertText.current = {
                    text: "El número telefónico se ha actualizado exitosamente",
                    property: "numberPhone",
                };
                break;
            }
        }

        dispatch(updateUserAction({ property, value }));
    }

    return { updateUser };
}
