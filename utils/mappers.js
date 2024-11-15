export function mapPizzaFromBackend(pizza) {
    const { id, name, text, image, status, type, ingredients, costs } = pizza;
    return {
        id,
        name,
        text,
        image,
        status,
        type,
        productType: "pizza",
        ingredients,
        price: costs,
    };
}

export function mapUserFromBackend(user) {
    const {
        id,
        name,
        password,
        email,
        phoneNumber,
        promotion,
        verified,
        state,
        RoleId,
        Companies,
        events,
        stores,
    } = user;
    return {
        id,
        name,
        password,
        email,
        numberPhone: phoneNumber,
        promotion,
        verified,
        state,
        RoleId,
        Companies,
        events,
        stores,
    };
}

export function mapStoresFromBackend(stores) {
    return stores.map((store) => {
        const {
            id,
            name,
            city,
            street,
            state,
            zip_code,
            country,
            address,
            notes,
            phoneNumber,
            coordinates,
            category,
            Schedules,
            open,
            closeTime,
            openTime,
        } = store;
        return {
            id,
            name,
            city,
            street,
            state,
            zip_code,
            country,
            place: address,
            notes,
            phone: phoneNumber,
            coordinates,
            category,
            Schedules,
            open,
            closeTime,
            openTime,
        };
    });
}

export function mapOrderToBackend(order) {
    const {
        applicationDate,
        deliveryDate,
        commissions,
        delivery,
        deliveryInformation,
        itemsList,
        storeId,
        userId,
        totalCost,
        totalCostByItems,
        stripeId,
        paymentMethod,
        paid,
    } = order;
    return {
        applicationDate,
        deliveryDate,
        delivery,
        deliveryInformation,
        itemsList,
        StoreId: storeId,
        UserId: userId,
        totalCost,
        commissions,
        totalCostByItems,
        StripeId: stripeId,
        paymentMethod,
        paid,
    };
}
