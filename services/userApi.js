import {
    userDataFromBackToFront,
    requestSettings,
} from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getOneUserById(id) {
    try {
        const response = await fetch(`${PATH_BACK}/users/${id}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function verifyEmailUser(token) {
    const response = await fetch(`${PATH_BACK}/users/verify/${token}`);
    const data = await response.json();
    if (data.message) return { message: data.message };
    return data[0] >= 1 ? true : false;
}

export async function requestVerification({ email }) {
    const res = await fetch(`${PATH_BACK}/users/send-verification`, {
        ...requestSettings("POST"),
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
}

export async function fetchwhoAmI(token) {
    const response = await fetch(`${PATH_BACK}/users/loged`, {
        ...requestSettings("GET", token),
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
}

export async function newAccount(data) {
    const res = await fetch(`${PATH_BACK}/users/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    });
    const data_1 = await res.json();
    return data_1;
}

export async function updateMyAccount(data) {
    try {
        const res = await fetch(`${PATH_BACK}/users/update`, {
            ...requestSettings("PUT"),
            body: JSON.stringify(data),
        });
        const data_2 = await res.json();
        if (data_2.message) throw new Error(data_2.message);
        const { token } = data_2;
        localStorage.setItem("user", JSON.stringify(token));
        return "Se ha actualizado exitosamente";
    } catch (error) {
        return { message: error.message };
    }
}

export async function verifyProperty(data) {
    const { property } = data;
    const res = await fetch(`${PATH_BACK}/users/verify/${property}`, {
        ...requestSettings("POST"),
        body: JSON.stringify(data),
    });
    const data_2 = await res.json();
    return data_2;
}

export async function lookingForUserLoged(token) {
    try {
        const user = await fetchwhoAmI(token);
        if (user.message) throw new Error(user.message);
        const userDataFront = userDataFromBackToFront(user);
        return userDataFront;
    } catch (error) {
        return { message: error.message };
    }
}

export async function requestCookie(tokenUser) {
    const data = await fetch(`${PATH_BACK}/users/verify-token`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ tokenUser }),
    });
    return await data.json();
}

export async function saveToken(tokenUser) {
    const response = await fetchwhoAmI(tokenUser);
    if (response.message) {
        alert(response.message);
        return { message: response.message };
    }
    localStorage.setItem("user", JSON.stringify(tokenUser));
    const userDataFront = userDataFromBackToFront(response);
    return userDataFront;
}

export async function getAllUsers(querys) {
    let query;
    if (querys) {
        query = Object.keys(querys)
            .filter((q) => querys[q])
            .map((q) => q + "=" + querys[q])
            .join("&&");
    }
    try {
        const response = await fetch(
            `${PATH_BACK}/users${query ? "?" + query : ""}`,
            {
                ...requestSettings(),
            }
        );
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function updateAccount(id, data) {
    const res = await fetch(`${PATH_BACK}/users/update/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(data),
    });
    const data_1 = await res.json();
    return data_1;
}

export function searchUser(email) {
    if (!email) return null;
    return fetch(`${PATH_BACK}/users/registered?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export function requestPasswordRecovery(email) {
    if (!email) return null;
    return fetch(`${PATH_BACK}/users/request-password-recovery/${email}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}

export async function forgetPassword({ token }) {
    const response = await fetch(`${PATH_BACK}/users/reset-password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(token),
    });
    const data = await response.json();
    return data;
}

export async function whatHappen(data) {
    const response = await fetch(`${PATH_BACK}/users/seeData`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    return data_1;
}

export async function requestLogout() {
    try {
        const response = await fetch(`${PATH_BACK}/users/logout`, {
            ...requestSettings("POST"),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function verifyUserData(email, password) {
    try {
        const res = await fetch(`${PATH_BACK}/users/login`, {
            ...requestSettings("POST"),
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        const { token } = data;
        const user = { ...data };
        return { user, token };
    } catch (error) {
        return { message: error.message };
    }
}

export async function requestUserArchiving(user) {
    try {
        const res = await fetch(`${PATH_BACK}/users/archive`, {
            ...requestSettings("POST"),
            body: JSON.stringify(user),
        });
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}
