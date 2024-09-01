import { getAllSchedules } from "@/services/scheduleApi";
import { isOpen, todaysScheduleIs } from "@/utils/hours";
import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getAllStores() {
    try {
        const response = await fetch(`${PATH_BACK}/stores`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const newData = data.map((store) => ({
            id: store.id,
            name: store.name,
            place: store.address,
            city: store.city,
            phone: store.phoneNumber,
            coordinates: store.coordinates,
        }));
        return newData;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getOneStoreById(id) {
    try {
        const response = await fetch(`${PATH_BACK}/stores/${id}`);
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        const {
            id: id_1,
            name,
            address,
            city,
            phoneNumber,
            coordinates,
        } = data;
        const store = {
            id,
            name,
            place: address,
            city,
            phone: phoneNumber,
            coordinates,
        };
        return store;
    } catch (error) {
        return { message: error.message };
    }
}

export async function getAllStoresWithSchedules() {
    const scheduels = await getAllSchedules();
    const storesList = await getAllStores();
    const scheduelsHours = {};
    scheduels.forEach((schedule) => {
        scheduelsHours[schedule.name] = schedule;
    });
    const todaySchedule = todaysScheduleIs(
        scheduelsHours.work.scheduleHoursList
    );
    const closeTime = todaySchedule ? todaySchedule.endTime : "";
    const openTime = todaySchedule ? todaySchedule.startTime : "";
    const workSchedule = scheduelsHours.work.scheduleHoursList.map(
        (schedule) => ({
            id: schedule.id,
            days: schedule.days,
            hours: `${schedule.startTime} - ${schedule.endTime}`,
        })
    );
    const pickupSchedule = scheduelsHours.pickup.scheduleHoursList.map(
        (schedule) => ({
            id: schedule.id,
            days: schedule.days,
            hours: `${schedule.startTime} - ${schedule.endTime}`,
        })
    );
    const deliverySchedule = scheduelsHours.delivery.scheduleHoursList.map(
        (schedule) => ({
            id: schedule.id,
            days: schedule.days,
            hours: `${schedule.startTime} - ${schedule.endTime}`,
        })
    );
    const storesWithSchedulsList = storesList.map((store) => ({
        ...store,
        closeTime,
        openTime,
        workSchedule: {
            id: scheduelsHours.work.id,
            name: "work",
            workSchedule,
        },
        pickupSchedule: {
            id: scheduelsHours.pickup.id,
            name: "pickup",
            pickupSchedule,
        },
        deliverySchedule: {
            id: scheduelsHours.delivery.id,
            name: "delivery",
            deliverySchedule,
        },
        open: isOpen({ closeTime, openTime }),
    }));
    return storesWithSchedulsList;
}

export async function updateStore(id, properties) {
    const { property, value } = properties;
    let newProperty = "";
    switch (property) {
        case "phone": {
            newProperty = "phoneNumber";
            break;
        }
        case "place": {
            newProperty = "address";
            break;
        }
        default: {
            newProperty = property;
            break;
        }
    }
    return fetch(`${PATH_BACK}/stores/${id}`, {
        ...requestSettings("PUT"),
        body: JSON.stringify({ property: newProperty, value }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.message) throw new Error(data.message);
            return data;
        })
        .catch((error) => ({ message: error.message }));
}
