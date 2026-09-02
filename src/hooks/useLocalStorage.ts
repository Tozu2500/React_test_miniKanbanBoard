import { useEffect, useState } from 'react';

/**
 * A custom hook that behaves like useState, but persists the value to
 * localStorage automatically. This is a common pattern for learning:
 * - useState for the in-memory value
 * - useEffect to sync it to a side effect (here, localStorage) whenever it changes
 *
 * Generic <T> lets this hook work for any JSON-serializable value.
 *
 * @param key - localStorage key to read from / write to.
 * @param initialValue - used when nothing is stored yet, or the stored
 *   value fails to parse.
 * @returns a `[value, setValue]` pair, just like `useState`.
 */
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