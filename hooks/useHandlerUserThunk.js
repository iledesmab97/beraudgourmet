import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { useRef } from "react";
import { useEffect } from "react";
import useGetModal from "@/hooks/useGetModal";

import { updateAlertMessage } from "@/stores/alertMessage/slice";

import {
    updateUserAction,
    signupUserAction,
    logInUserAction,
    logOutUserAction,
} from "@/stores/actions/users";

export default function useHandlerUserThunk() {
    const { user, status, error } = useAppSelector((state) => state.user);
    const { handleChangeModal } = useGetModal({ modalType: "changePassword" });
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

        // Show message
        dispatch(
            updateAlertMessage({
                checked: true,
                text: alertText.current.text,
                status: status === "succeeded" ? "success" : "error",
            })
        );

        // Close Modal Change password
        if (
            alertText.current.property === "password" &&
            status === "succeeded"
        ) {
            handleChangeModal("changePassword", "user");
        }

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

    async function loginUser({ email, password }) {
        alertText.current = {
            text: "Has iniciado sesión exitosamente",
            property: null,
        };
        dispatch(logInUserAction({ email, password }));
    }

    async function logout() {
        alertText.current = {
            text: "Has cerrado sesión exitosamente",
            property: null,
        };
        dispatch(logOutUserAction());
    }

    async function signUpUser({ email, name, password, numberPhone }) {
        alertText.current = {
            text: "Te has registrado exitosamente",
            property: null,
        };
        dispatch(signupUserAction({ email, name, password, numberPhone }));
    }

    return { updateUser, loginUser, logout, signUpUser };
}
