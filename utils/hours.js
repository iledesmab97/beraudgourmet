import dayjs from "dayjs";

export const weekDaysEN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export const weekDaysES = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

const typeDelivery = {
    store: "pickupSchedule",
    home: "deliverySchedule",
};

export function isOpen({ openTime, closeTime }) {
    const now = dayjs();
    const openTimeDay = dayjs(`${now.format("D")} ${openTime}`, "D hh:mm a");
    const closeTimeDay = dayjs(`${now.format("D")} ${closeTime}`, "D hh:mm a");
    return now.isAfter(openTimeDay) && now.isBefore(closeTimeDay);
}

export function dateStringToDate(date) {
    const dateString = date;
    const [dateWithSlash, time] = dateString.split(" - ");
    const [day, month, year] = dateWithSlash.split("/");
    const [hour_min, am_pm] = time.split(" ");
    let [hour, mine] = hour_min.split(":");
    if (hour === "12") {
        hour = am_pm === "am" ? "00" : hour;
    } else {
        hour = am_pm === "am" ? hour : String(Number(hour) + 12);
    }
    const totalDateString = `${year}-${month}-${day} ${hour}:${mine}:00`;
    const dateA = dayjs(
        totalDateString,
        ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"],
        true
    );
    return dateA;
}

export function timeStringToObject(time) {
    const [hour_min, am_pm] = time.split(" ");
    let [hour, mine] = hour_min.split(":");
    if (hour === "12") {
        hour = am_pm === "am" ? "00" : hour;
    } else {
        hour = am_pm === "am" ? hour : String(Number(hour) + 12);
    }
    const date = dayjs().format("YYYY-MM-DD");
    return dayjs(`${date} ${hour}:${mine}`);
}

export function howMuchLeft(dateString) {
    const date = dateStringToDate(dateString);
    const now = dayjs();
    let comparation = date.isBefore(now);
    if (!comparation) {
        return date.isSame(now, "day") ? "today" : "early";
    } else {
        return "late";
    }
}

export function todaysScheduleIs(scheduleList) {
    const currentDate = new Date();
    const dayNumber = currentDate.getDay();
    const dayName = weekDaysEN[dayNumber];
    const indexOrderDay = weekDaysEN.indexOf(dayName);
    return scheduleList.find((schedule) => {
        const days = schedule.days.split("-");
        const indexStart = weekDaysES.indexOf(days[0]);
        const indexEnd = weekDaysES.indexOf(days[1]);
        if (indexStart <= indexEnd) {
            return indexOrderDay >= indexStart && indexOrderDay <= indexEnd;
        } else {
            return indexOrderDay >= indexStart || indexOrderDay <= indexEnd;
        }
    });
}

export function getTimeLimitTodaySchedue(place) {
    if (!place.deadLine)
        return {
            minHour: dayjs(),
            maxHour: dayjs(),
        };
    const scheduleList =
        place.closerStore[typeDelivery[place.typeDelivery.name]][
            typeDelivery[place.typeDelivery.name]
        ];

    const scheduleOfDay = todaysScheduleIs(scheduleList);
    const orderDayObject = dayjs();
    const minHour = scheduleOfDay.hours.split(" - ")[0];
    const maxHour = scheduleOfDay.hours.split(" - ")[1];
    return {
        minHour: timeStringToObject(minHour)
            .date(orderDayObject.date())
            .month(orderDayObject.month())
            .year(orderDayObject.year()),
        maxHour: timeStringToObject(maxHour)
            .date(orderDayObject.date())
            .month(orderDayObject.month())
            .year(orderDayObject.year()),
    };
}

export function dateInRange({ minHour, maxHour, daySelected }) {
    let why = "out of time";

    const selectedDateObject =
        daySelected === null
            ? dayjs().subtract(1, "minute")
            : typeof daySelected === "string"
            ? dateStringToDate(daySelected)
            : daySelected;
    const minTimeObject =
        typeof minHour === "string" ? timeStringToObject(minDate) : minHour;
    const maxTimeObject =
        typeof maxHour === "string" ? timeStringToObject(maxDate) : maxHour;

    const maxDateObject = maxTimeObject
        .date(selectedDateObject.format("D"))
        .month(Number(selectedDateObject.format("M")) - 1)
        .year(selectedDateObject.format("YYYY"));

    let minDateObject = minTimeObject
        .date(selectedDateObject.format("D"))
        .month(Number(selectedDateObject.format("M")) - 1)
        .year(selectedDateObject.format("YYYY"));

    if (selectedDateObject.isBefore(dayjs())) {
        return { inRange: false, why: "past hour" };
    }

    if (
        selectedDateObject.isAfter(minDateObject) &&
        selectedDateObject.isBefore(dayjs().add(29, "minute"))
    ) {
        why = "too soon";
        minDateObject = dayjs().add(30, "minute");
    }

    const inRange =
        selectedDateObject.isSame(minDateObject) ||
        (selectedDateObject.isAfter(minDateObject) &&
            selectedDateObject.isBefore(maxDateObject));

    if (inRange) return { inRange };

    return { inRange, why };
}

export function objectDateToString(dateObject) {
    const dateString = dateObject.format("DD/MM/YYYY - hh:mm a");
    return dateString;
}

export function timeOutCalculator(min) {
    const timer = dayjs().add(min, "minute");
    return timer;
}

export function howMuchLeftTime(time) {
    const now = dayjs();
    const missingMS = time.diff(now);
    const missing = Math.round(missingMS / 1000);
    let min = String(Math.floor(missing / 60));
    if (min.length !== 2) {
        min = "0" + min;
    }
    let sec = String(missing - min * 60);
    if (sec.length !== 2) {
        sec = "0" + sec;
    }

    return { sec: missing, min: `${min}:${sec}` };
}
