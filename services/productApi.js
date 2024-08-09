import { twoDecimals } from "@/utils/priceCar";
import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getPizzas() {
    try {
        const response = await fetch(`${PATH_BACK}/pizzas`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const pizzaList = data.map((pizza) => {
            const { id, name, text, image, status, type } = pizza;
            const newPizzaData = {
                id,
                name,
                text,
                image,
                status,
                type,
                productType: "pizza",
            };
            return newPizzaData;
        });
        return pizzaList;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getOnePizzaById(id) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzas/${id}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const { name, text, image, status, type, ingredients, price } = data;
        const newPizzaData = {
            id,
            name,
            text,
            image,
            status,
            type,
            productType: "pizza",
            ingredients,
            price,
        };
        return newPizzaData;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getOnePizzaByName(name) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzas/name/${name}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const {
            id,
            name: name_1,
            text,
            image,
            ingredients,
            status,
            type,
        } = data;
        const newPizzaData = {
            id,
            name,
            text,
            image,
            ingredients,
            status,
            type,
            productType: "pizza",
        };
        return newPizzaData;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getPizzaIngredients(name) {
    try {
        const response = await fetch(`${PATH_BACK}/pizzas/ingredients/${name}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getSaladIngredients(name) {
    try {
        const response = await fetch(`${PATH_BACK}/salads/ingredients/${name}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getPizzaCosts({ type }) {
    const response = await fetch(`${PATH_BACK}/pizzaCosts`);
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    const pizzaCostsList = data.map((pizzaCost) => {
        const {
            id,
            cost,
            costIVA,
            costIVAStripe,
            pizza,
            pizzaCharacteristics,
        } = pizzaCost;
        const newPizzaCost = {
            id,
            cost,
            costIVA: twoDecimals(costIVA),
            costIVAStripe,
            pizza,
            pizzaCharacteristics,
        };
        return newPizzaCost;
    });
    if (type === "object") {
        const listCostsObject = {};
        pizzaCostsList.forEach((pizzaCost_3) => {
            const {
                costIVAStripe: costIVAStripe_1,
                pizza: pizza_1,
                pizzaCharacteristics: pizzaCharacteristics_2,
            } = pizzaCost_3;
            const { mass, size } = pizzaCharacteristics_2;

            if (listCostsObject[pizza_1]) {
                // cost per mass
                const costPerMass = {
                    ...listCostsObject[pizza_1][size],
                    [mass]: costIVAStripe_1,
                };
                // mass per size
                const massPerSize = {
                    ...listCostsObject[pizza_1],
                    [size]: costPerMass,
                };

                listCostsObject[pizza_1] = massPerSize;
            } else {
                // cost per mass
                const costPerMass_1 = {
                    [mass]: costIVAStripe_1,
                };
                // mass per size
                const massPerSize_1 = {
                    [size]: costPerMass_1,
                };

                listCostsObject[pizza_1] = massPerSize_1;
            }
        });
        return listCostsObject;
    }
    return pizzaCostsList;
}

export async function getCostOfPizza(id) {
    const response = await fetch(`${PATH_BACK}/pizzaCosts/${id}`);
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
}

export async function getExtraIngredients() {
    return fetch(`${PATH_BACK}/ingredients`)
        .then((response) => response.json())
        .then((data) => {
            const extraIngredinetList = {};
            data.forEach((extraIngredient) => {
                const { id, name, cost, costIVAStripe, available } =
                    extraIngredient;
                extraIngredinetList[name] = {
                    id,
                    name,
                    price: cost,
                    totalPrice: costIVAStripe ? costIVAStripe : "0",
                    available,
                };
            });
            return extraIngredinetList;
        });
}

export async function getPizzasWithCosts() {
    try {
        const pizzasList = await getPizzas();
        // const pizzaCharacteristicsList = await getPizzaCosts({
        //     type: "object",
        // });
        const totalPizzasList = pizzasList.map((pizza) => ({
            ...pizza,
            // price: pizzaCharacteristicsList[pizza.name],
        }));
        return totalPizzasList;
    } catch (error) {
        return { message: error.message };
    }
}

export async function updatePizza(id, properties) {
    return fetch(`${PATH_BACK}/pizzas/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(properties),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);

            const { id, name, text, image, status, type } = response;
            const pizza = {
                id,
                name,
                text,
                image,
                status,
                type,
                productType: "pizza",
            };
            return pizza;
        })
        .catch((error) => ({ message: error.message }));
}

export async function removePizza(id) {
    return fetch(`${PATH_BACK}/pizzas/${id}`, {
        ...requestSettings("DELETE"),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            return response;
        })
        .catch((error) => ({ message: error.message }));
}

export async function getAllIngredients() {
    return fetch(`${PATH_BACK}/ingredients`)
        .then((response) => response.json())
        .then((data) => data);
}

export async function getAllExtraIngredients() {
    return fetch(`${PATH_BACK}/ingredients`)
        .then((response) => response.json())
        .then((data) => data);
}

export async function addNewPizza(pizza) {
    return fetch(`${PATH_BACK}/pizzas`, {
        ...requestSettings("POST"),
        body: JSON.stringify(pizza),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            return response;
        })
        .catch((error) => ({ message: error.message }));
}

export async function sendImage(formData) {
    return fetch(`${PATH_BACK}/pizzas/image`, {
        ...requestSettings("POST", null, "image"),
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                return data;
            } else {
                throw new Error(data.message);
            }
        })
        .catch((error) => ({ message: error.message, status: "error" }));
}

export async function updateCharacteristicsPizza(id, body) {
    return fetch(`${PATH_BACK}/pizzaCosts/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            return response;
        })
        .catch((error) => ({ message: error.message }));
}

export async function updateExtraIngredient(id, properties) {
    try {
        const response = await fetch(`${PATH_BACK}/ingredients/${id}`, {
            ...requestSettings("PUT"),
            body: JSON.stringify(properties),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}

export async function makeExtraIngredient(properties) {
    try {
        const response = await fetch(`${PATH_BACK}/ingredients`, {
            ...requestSettings("POST"),
            body: JSON.stringify(properties),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function removeExtraIngredient(id) {
    try {
        const response = await fetch(`${PATH_BACK}/ingredients/${id}`, {
            ...requestSettings("DELETE"),
        });
        const response_1 = await response.json();
        if (response_1.message) throw new Error(response_1.message);
        return response_1;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getSalads() {
    try {
        const response = await fetch(`${PATH_BACK}/salads`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const saladList = data.map((salad) => {
            const {
                id,
                name,
                text,
                image,
                ingredients,
                status,
                type,
                cost,
                costIVAStripe,
            } = salad;
            const newSaladData = {
                id,
                name,
                text,
                image,
                ingredients,
                status,
                type,
                price: cost,
                totalPriceByUnity: costIVAStripe,
                productType: "salad",
            };
            return newSaladData;
        });
        return saladList;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getOneSaladById(id) {
    try {
        const response = await fetch(`${PATH_BACK}/salads/${id}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const {
            name,
            text,
            image,
            ingredients,
            status,
            type,
            cost,
            costIVAStripe,
        } = data;
        const newSaladData = {
            id,
            name,
            text,
            image,
            ingredients,
            status,
            type,
            price: cost,
            totalPriceByUnity: costIVAStripe,
            productType: "salad",
        };
        return newSaladData;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getOneSaladByName(name) {
    try {
        const response = await fetch(`${PATH_BACK}/salads/name/${name}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const {
            id,
            name: name_1,
            text,
            image,
            ingredients,
            status,
            type,
            cost,
            costIVAStripe,
        } = data;
        const newSaladData = {
            id,
            name,
            text,
            image,
            ingredients,
            status,
            type,
            price: cost,
            totalPriceByUnity: costIVAStripe,
            productType: "salad",
        };
        return newSaladData;
    } catch (error) {
        return { message: error.message };
    }
}

export async function addNewSalad(salad) {
    return fetch(`${PATH_BACK}/salads`, {
        ...requestSettings("POST"),
        body: JSON.stringify(salad),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            return response;
        })
        .catch((error) => ({ message: error.message }));
}

export async function updateSalad(id, properties) {
    return fetch(`${PATH_BACK}/salads/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify(properties),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            const { id, name, text, image, status, type, cost, costIVAStripe } =
                response;
            const salad = {
                id,
                name,
                text,
                image,
                status,
                type,
                price: cost,
                totalPriceByUnity: costIVAStripe,
                productType: "salad",
            };
            return salad;
        })
        .catch((error) => ({ message: error.message }));
}
