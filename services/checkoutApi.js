export function createPaymentRequest({userId, email, amount, description, payInPlace}) {
    return fetch('api/checkout', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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
    return fetch('api/checkout', {
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