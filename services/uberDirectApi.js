const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

// Get a delivery quote
export const getDeliveryQuote = async (origin, destination) => {
    const quoteUrl = `${PATH_BACK}/uber-direct/quote`;

    try {
        const response = await fetch(quoteUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                origin,
                destination,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error fetching delivery quote: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching delivery quote:", error);
        throw error;
    }
};

// Create a delivery order
export const createDeliveryOrder = async (orderDetails) => {
    const orderUrl = `${PATH_BACK}/uber-direct/order`;

    try {
        const response = await fetch(orderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            throw new Error(
                `Error creating delivery order: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating delivery order:", error);
        throw error;
    }
};

export const trackDelivery = async (deliveryId) => {
    const trackUrl = `${PATH_BACK}/uber-direct/track/${deliveryId}`;

    try {
        const response = await fetch(trackUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error tracking delivery: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error tracking delivery:", error);
        throw error;
    }
};

// Cancel a delivery
export const cancelDelivery = async (deliveryId) => {
    const cancelUrl = `${PATH_BACK}/uber-direct/cancel/${deliveryId}`;

    try {
        const response = await fetch(cancelUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Empty body, as per your API requirements
        });

        if (!response.ok) {
            throw new Error(`Error canceling delivery: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error canceling delivery:", error);
        throw error;
    }
};
