"use client";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

import UserNew from "./UserNew";
import ButtonNameUserLoged from "./ButtonNameUserLoged"
import ButtonPhoneUserLoged from "./ButtonPhoneUserLoged"
import SliceProgressBar from "@/components/SliceProgressBar/SliceProgressBar";

import useHandleUser from "@/hooks/useHandleUser";
import useHandlerUserThunk from "@/hooks/useHandlerUserThunk"

export default function UserSection() {
    const {
        inputs,
        handleChange,
        errors,
        currentUser,
        userLoged,
        editing,
        handleChangeNumberPhone,
        verifyError,
    } = useHandleUser();
    const { loginUser, signUpUser } = useHandlerUserThunk("UserNew")

    function login() {
        const { email, password } = inputs
        const { email: emailError, password: passwordError } = verifyError()
        if (emailError || passwordError) return
        loginUser({ email, password })
    }

    function signUp() {
        const { email: emailError, name:nameError, password:passwordError, numberPhone:numberPhoneError } = verifyError()
        if (emailError || nameError || passwordError || numberPhoneError) return
        signUpUser(inputs)
    }

    return (
        <FormControl
            id="UserSection-container"
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            <Typography variant="title" gutterBottom>
                {userLoged ? "Cuenta" : "Iniciar Sesión / Registrarse"}
            </Typography>

            {userLoged ? (
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}
                >
                    <ButtonNameUserLoged inputs={inputs}/>
                    <ButtonPhoneUserLoged inputs={inputs}/>
                </Grid>
            ) : (
                <UserNew
                    inputs={inputs}
                    handleChange={handleChange}
                    errors={errors}
                    editing={editing}
                    currentUser={currentUser}
                    handleChangeNumberPhone={handleChangeNumberPhone}
                    login={login}
                    signUp={signUp}
                />
            )}

            <SliceProgressBar section={"user"} />
        </FormControl>
    );
}
