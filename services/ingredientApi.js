import { requestSettings } from "@/utils/preparingData";
import { generateURLQueries } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getExtraIngredients(queries) {
    const queriesString = generateURLQueries(queries);
    const res = await fetch(`${PATH_BACK}/ingredients${queriesString}`);
    const data = await res.json();
    if (data.message) throw new Error(data.message);
    const extraIngredinetList = {};
    data.forEach((extraIngredient) => {
        const { id, name, cost, costIVAStripe, available } = extraIngredient;
        extraIngredinetList[name] = {
            id,
            name,
            price: cost,
            totalPrice: costIVAStripe ? costIVAStripe : "0",
            available,
        };
    });
    return extraIngredinetList;
}

export function addIngredient(name) {
    return fetch(`${PATH_BACK}/ingredients`, {
        ...requestSettings("POST"),
        body: JSON.stringify({ name }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.message) throw new Error(response.message);
            return response;
        })
        .catch((error) => {
            return { message: error.message };
        });
}

export function removeIngredient({ id, name }) {
    if (id) {
        return fetch(`${PATH_BACK}/ingredients/${id}`, {
            ...requestSettings("DELETE"),
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.message) throw new Error(response.message);
                return response;
            })
            .catch((error) => {
                return { message: error.message };
            });
    } else if (name) {
        return fetch(`${PATH_BACK}/ingredients`, {
            ...requestSettings("DELETE"),
            body: JSON.stringify({ name }),
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.message) throw new Error(response.message);
                return response;
            })
            .catch((error) => {
                return { message: error.message };
            });
    }
}
