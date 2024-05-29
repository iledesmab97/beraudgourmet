import { requestSettings } from '@/utils/preparingData'

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK

export function createPaymentRequest({userId, email, amount, description, payInPlace}) {
    return fetch(`${PATH_BACK}/checkout`, {
        ...requestSettings('POST'),
        body: JSON.stringify({
            userId: `${userId}`,
            email,
            amount,
            description,
            capture: payInPlace ? 'manual' : 'automatic'
        })
    })
        .then(res => res.json())
        .then(data => data)
}

export function updatePaymentRequest({amount, stripeId, description, payInPlace}) {
    return fetch(`${PATH_BACK}/checkout`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount,
            stripeId,
            description,
            capture: payInPlace ? 'manual' : 'automatic'
        })
    })
        .then(res => res.json())
        .then(data => data)
}

export function captureFundsRequest(stripeId, orderId) {
    return fetch(`${PATH_BACK}/checkout/capture`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeId, orderId })
    })
        .then(res => res.json())
        .then(data => data)
}