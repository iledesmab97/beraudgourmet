import { requestSettings } from "@/utils/preparingData";

const PATH_BACK = process.env.NEXT_PUBLIC_PATH_BACK;

export async function createDelivery(body) {
    const res = await fetch(`${PATH_BACK}/deliveries`, {
        ...requestSettings("POST"),
        body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.message)
        throw new Error(`Error creating delivery data: ${data.message}`);
    return data;
}
