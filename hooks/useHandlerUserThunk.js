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
        if (error) {
            alertText.current.text =
                error === "Wrong password" ? "Contraseña incorrecta" : error;
        }
        dispatch(
            updateAlertMessage({
                checked: true,
                text: alertText.current.text,
                status: status === "succeeded" ? "success" : "error",
            })
        );

        alertText.current = {
            text: "",
            property: null,
        };
    }, [status]);

    function updateUser({ property, value, verification }) {
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
            case "password": {
                alertText.current = {
                    text: "La contraseña se ha actualizado exitosamente",
                    property: "password",
                };

                break;
            }
        }

        dispatch(updateUserAction({ property, value, verification }));
    }

    return { updateUser };
}
