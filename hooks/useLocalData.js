import { useCallback } from "react";

function useLocalData() {
    const getLocalData = useCallback((key) => {
        const dataFromLocal = localStorage.getItem(key);
        return JSON.parse(dataFromLocal);
    }, []);

    const saveLocalData = useCallback((key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }, []);

    const removeLocalData = useCallback((key) => {
        localStorage.removeItem(key);
    }, []);

    const removeAllLocalData = useCallback(() => {
        localStorage.clear();
    }, []);

    return { getLocalData, saveLocalData, removeLocalData, removeAllLocalData };
}

export default useLocalData;
