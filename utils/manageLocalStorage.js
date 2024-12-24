export const removeLocalData = (key) => {
    localStorage.removeItem(key);
};

export const saveLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key) => {
    const value = localStorage.getItem(key);
    try {
        const totalValue = JSON.parse(value);
        return totalValue;
    } catch (error) {
        return value;
    }
};
