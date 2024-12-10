export const removeLocalData = (key) => {
    localStorage.removeItem(key);
};

export const saveLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key) => {
    const value = localStorage.getItem(key);
    if (typeof value === "string") return value;
    return JSON.parse(value);
};
