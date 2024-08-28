import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function createPaymentRequest({
    userId,
    email,
    amount,
    description,
    payInPlace,
}) {
    const res = await fetch(`${PATH_BACK}/checkout`, {
        ...requestSettings("POST"),
        body: JSON.stringify({
            userId: `${userId}`,
            email,
            amount,
            description,
            capture: payInPlace ? "manual" : "automatic",
        }),
    });
    const data = await res.json();
    return data;
}

export async function updatePaymentRequest({
    amount,
    stripeId,
    description,
    payInPlace,
}) {
    const res = await fetch(`${PATH_BACK}/checkout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount,
            stripeId,
            description,
            capture: payInPlace ? "manual" : "automatic",
        }),
    });
    const data = await res.json();
    return data;
}

export async function captureFundsRequest(stripeId, orderId) {
    const res = await fetch(`${PATH_BACK}/checkout/capture`, {
        ...requestSettings("POST"),
        body: JSON.stringify({ stripeId, orderId }),
    });
    const data = await res.json();
    return data;
}
