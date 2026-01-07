import { useState, useEffect } from 'react';

export function useSessionStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Błąd odczytu z sessionStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Błąd zapisu do sessionStorage:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}