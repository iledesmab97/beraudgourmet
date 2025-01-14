import { requestSettings } from "@/utils/preparingData";
const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

// Get a delivery quote
export const getDeliveryQuote = async ({ pickup, dropoff }) => {
    const quoteUrl = `${PATH_BACK}/ubers/quote`;

    try {
        const response = await fetch(quoteUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pickup,
                dropoff,
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
export const createUberOrder = async ({ orderId }) => {
    const url = `${PATH_BACK}/ubers/${orderId}`;

    const response = await fetch(url, {
        method: "POST",
        ...requestSettings("POST"),
    });
    const data = await response.json();
    if (data.message) {
        throw new Error(data.message);
    }
    return data;
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
