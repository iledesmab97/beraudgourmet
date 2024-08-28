export const removeLocalData = (key) => {
    localStorage.removeItem(key);
};

export const saveLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
