import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function getAllSchedules() {
    const response = await fetch(`${PATH_BACK}/schedules`);
    const data = await response.json();
    return data;
}

export async function updateSchedulesHoursOfSchedules(id, newScheduleHours) {
    try {
        const response = await fetch(`${PATH_BACK}/schedules/${id}`, {
            ...requestSettings("PUT"),
            body: JSON.stringify(newScheduleHours),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    } catch (error) {
        return { message: error.message };
    }
}
