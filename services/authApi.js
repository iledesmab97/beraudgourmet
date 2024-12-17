const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export function fetchAuthGoogle(company) {
    window.location.href = `${PATH_BACK}/auth/google?company=${company}`;
}
