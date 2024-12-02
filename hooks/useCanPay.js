import { useState, useEffect } from "react";
import useGetOrders from "@/hooks/useGetOrders";
import useGetPlace from "@/hooks/useGetPlace";
import useGetUser from "@/hooks/useGetUser";

import { getTimeLimitTodaySchedue, dateInRange } from "@/utils/hours";

export default function useCanPay() {
    const [canPay, setCanPay] = useState(false);
    const { orders } = useGetOrders();
    const { place } = useGetPlace();
    const { user } = useGetUser();
    const [missing, setMissing] = useState("");

    useEffect(() => {
        whatDataMissing();
    }, [orders, place, user]);

    function whatDataMissing() {
        const { minHour, maxHour } = getTimeLimitTodaySchedue(place);
        const daySelected =
            place.deadLine && place.deadLine.time
                ? place.deadLine.date.realDate +
                  " - " +
                  place.deadLine.time.realTime
                : null;
        if (
            !orders.length &&
            !user &&
            !place.closerStore &&
            !dateInRange({ minHour, maxHour, daySelected }).inRange
        ) {
            setMissing("");
            if (canPay) setCanPay(false);
            return "all";
        }
        if (!user) {
            setMissing("user");
            if (canPay) setCanPay(false);
            return "user";
        }
        if (!orders.length) {
            setMissing("orders");
            if (canPay) setCanPay(false);
            return "orders";
        }
        if (!place.closerStore) {
            setMissing("place");
            if (canPay) setCanPay(false);
            return "place";
        }
        if (!dateInRange({ minHour, maxHour, daySelected }).inRange) {
            setMissing("time");
            if (canPay) setCanPay(false);
            return "time";
        }
        setMissing("");
        setCanPay(true);
        return null;
    }

    return { canPay, missing, whatDataMissing };
}
