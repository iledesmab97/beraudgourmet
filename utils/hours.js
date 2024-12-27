import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
export const weekDaysEN_ES = {
    Sunday: "Domingo",
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
};

export const typeDeliveryOptions = {
    store: "pickup",
    home: "delivery",
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
    const [year, month, day] = dateWithSlash.split("/");
    let [hour, mine] = time.split(":");
    const totalDateString = `${year}-${month}-${day} ${hour}:${mine}:00`;
    const dateA = dayjs(
        totalDateString,
        ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"],
        true
    );
    return dateA;
}

export function timeStringToObject(time) {
    let [hour, mine] = time.split(":");
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

export function getTimeLimitTodaySchedue({
    closerStore,
    deadLine,
    typeDelivery,
    format,
}) {
    if (!deadLine)
        return {
            minHour: dayjs(),
            maxHour: dayjs(),
        };

    const today = dayjs(deadLine.date.realDate, format);
    const schedule = closerStore.Schedules.find((schedule) => {
        const sameScheduleType =
            schedule.type === typeDeliveryOptions[typeDelivery.name];
        const sameDay = schedule.day === today.format("dddd");
        if (sameScheduleType && sameDay) return true;
        return false;
    });

    const [minHour, minMinute] = schedule.startTime.split(":");
    const [maxHour, maxMinute] = schedule.endTime.split(":");

    return {
        minHour: dayjs().hour(minHour).minute(minMinute),
        maxHour: dayjs().hour(maxHour).minute(maxMinute),
    };
}

export function dateInRange({ minHour, maxHour, daySelected, typeDelivery }) {
    let why = "out of time";

    const selectedDateObject =
        daySelected === null
            ? dayjs().subtract(1, "minute")
            : typeof daySelected === "string"
            ? dateStringToDate(daySelected)
            : daySelected;
    const minTimeObject =
        typeof minHour === "string" ? timeStringToObject(minHour) : minHour;
    const maxTimeObject =
        typeof maxHour === "string" ? timeStringToObject(maxHour) : maxHour;

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

    if (typeDelivery.name === "store") {
        if (
            selectedDateObject.isAfter(minDateObject) &&
            selectedDateObject.isBefore(dayjs().add(29, "minute"))
        ) {
            why = "too soon";
            minDateObject = dayjs().add(29, "minute");
        }
    } else if (typeDelivery.name === "home") {
        if (
            selectedDateObject.isAfter(minDateObject) &&
            selectedDateObject.isBefore(dayjs().add(59, "minute"))
        ) {
            why = "too soon";
            minDateObject = dayjs().add(59, "minute");
        }
    }

    const inRange =
        selectedDateObject.isSame(minDateObject) ||
        (selectedDateObject.isAfter(minDateObject) &&
            selectedDateObject.isBefore(maxDateObject));

    if (inRange) return { inRange };

    return { inRange, why };
}

export function objectDateToString(dateObject, format) {
    const dateString = dateObject.format(format);
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

export function sortWeekDays(listDays) {
    const sorteList = listDays.sort((a, b) => {
        const na = weekDaysEN.indexOf(a.day);
        const nb = weekDaysEN.indexOf(b.day);
        return na - nb;
    });

    return sorteList;
}

export function getNearestSchedule(scheduleList) {
    const today = dayjs();
    let nday = today.day();
    for (let i of weekDaysEN) {
        const scheduleDay = scheduleList.find(
            (schedule) => schedule.day === weekDaysEN[nday]
        );
        if (scheduleDay) return scheduleDay;
        nday++;
        if (nday >= 6) {
            nday = nday - 6;
        }
    }
    return null;
}
