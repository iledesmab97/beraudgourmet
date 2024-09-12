const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getAllMasses() {
    const response = await fetch(`${PATH_BACK}/pizzaMasses`);
    const data = await response.json();
    return data;
}

export async function getAllSizes() {
    const response = await fetch(`${PATH_BACK}/pizzaSizes`);
    const data = await response.json();
    return data;
}

export async function addNewSize(size) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzaSizes`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ size }),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function deleteSize(size) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzaSizes`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ size }),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function addNewMass(mass) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzaMasses`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name: mass }),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function deleteMass(mass) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzaMasses`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name: mass }),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}
