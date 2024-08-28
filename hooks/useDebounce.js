import { useRef, useCallback } from "react";

export default function useDebounce() {
    const timerRef = useRef();

    const debounceSetValue = useCallback((callback, time) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(callback, time);
    }, []);

    return { debounceSetValue };
}
