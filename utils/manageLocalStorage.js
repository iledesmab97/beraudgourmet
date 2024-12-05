export const removeLocalData = (key) => {
    localStorage.removeItem(key);
};

export const saveLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
