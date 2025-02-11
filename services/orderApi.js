import { requestSettings, generateURLQueries } from "@/utils/preparingData";
import { mapOrderToBackend, mapOrderFromBackend } from "@/utils/mappers";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getAllOrders(queries) {
    const queriesString = generateURLQueries(queries);
    const response = await fetch(`${PATH_BACK}/orders${queriesString}`, {
        ...requestSettings(),
        cache: "no-store",
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
}

export async function getAllOrdersOfUser({ userId, queries }) {
    const queriesString = generateURLQueries(queries);
    const response = await fetch(
        `${PATH_BACK}/orders/user/${userId}${queriesString}`,
        {
            ...requestSettings(),
            cache: "no-store",
        }
    );
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    const { totalOrders, count } = data;
    const totalOrdersFront = totalOrders.map((item) =>
        mapOrderFromBackend(item)
    );
    return { totalOrdersFront, count };
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

export async function updateOrder(id, body) {
    const res = await fetch(`${PATH_BACK}/orders/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.message) throw new Error(data.message);
    return data;
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

export async function verifyDataOrder(body) {
    const response = await fetch(`${PATH_BACK}/orders/verify`, {
        ...requestSettings("POST"),
        body: JSON.stringify(mapOrderToBackend(body)),
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
}

export async function registerOrder(body) {
    const response = await fetch(`${PATH_BACK}/orders`, {
        ...requestSettings("POST"),
        body: JSON.stringify(mapOrderToBackend(body)),
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
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

export async function changeOrderItems(data) {
    try {
        const res = await fetch(`${PATH_BACK}/orders/changeItems`, {
            ...requestSettings("PUT"),
            body: JSON.stringify(data),
        });
        const data_1 = await res.json();
        if (data_1.message) throw new Error(data_1.message);
        console.log("Los items de la orden fueron actualizados exitosamente");
        return data_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getDeliveryInformationOfOrder(id) {
    try {
        const response = await fetch(`${PATH_BACK}/deliveryInformation/${id}`, {
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
