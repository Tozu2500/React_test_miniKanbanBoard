// Generic: works for any JSON-serializable value and the return type follows
// whatever you pass as the initial value
import { useEffect, useState } from "react";

// useState that persists to localStorage under key
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch (error) {
            console.warn(`Could not read localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Could not write localStorage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}