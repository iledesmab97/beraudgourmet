const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function fetchAuthGoogle() {
    console.log('voy a empezar con la autenticación')
    window.location.href = `${PATH_BACK}/auth/google`
}