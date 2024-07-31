import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export function getAllOrders(queries) {
    let lastPath;
    if (queries) {
        lastPath = Object.keys(queries)
            .map((query) => `${query}=${queries[query]}`)
            .join("&&");
    }

    return fetch(`${PATH_BACK}/orders${lastPath ? "?" + lastPath : ""}`, {
        ...requestSettings(),
        cache: "no-store",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export function getAllOrdersOfUser(userId) {
    return fetch(`${PATH_BACK}/orders/user/${userId}`, {
        ...requestSettings(),
        cache: "no-store",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export async function getOneOrder(orderId) {
    try {
        const response = await fetch(`${PATH_BACK}/orders/${orderId}`, {
            ...requestSettings(),
            cache: "no-store",
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getItemsOrder(orderId) {
    try {
        const response = await fetch(`${PATH_BACK}/orders/items/${orderId}`, {
            ...requestSettings(),
            cache: "no-store",
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export function updateOrder(id, body) {
    return fetch(`${PATH_BACK}/orders/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export async function sendImage(id, formData) {
    return fetch(`${PATH_BACK}/orders/image/${id}`, {
        ...requestSettings("POST", null, "image"),
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export async function registerOrder(data) {
    return fetch(`${PATH_BACK}/orders`, {
        ...requestSettings("POST"),
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            console.log("La orden fue creada exitosamente");
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export function requestRemovalOrder(id) {
    if (!id) return { message: "id can not be undefined" };
    return fetch(`${PATH_BACK}/orders/${id}`, {
        ...requestSettings("DELETE"),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            console.log("La orden fue removida exitosamente");
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export function changeOrderItems(data) {
    return fetch(`${PATH_BACK}/orders/changeItems`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            console.log(
                "Los items de la orden fueron actualizados exitosamente"
            );
            return data;
        })
        .catch((error) => ({ message: error.message }));
}

export function getDeliveryInformationOfOrder(id) {
    return fetch(`${PATH_BACK}/deliveryInformation/${id}`, {
        ...requestSettings(),
        cache: "no-store",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}
