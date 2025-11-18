import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type SetState<T> = (value: T | ((prev: T) => T)) => void;

const usePageState = <T extends Record<string, unknown>>(defaultState: T): [T, SetState<T>] => {
    const location = useLocation();
    const key = `page_state_${location.pathname}`;

    const [state, setState] = useState<T>(() => {
        const stored = sessionStorage.getItem(key);
        if (stored) {
            try {
                return { ...defaultState, ...JSON.parse(stored) } as T;
            } catch (e) {
                console.warn('parse failed');
            }
        }
        return defaultState;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
};

export default usePageState;
