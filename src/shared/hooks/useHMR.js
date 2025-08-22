// src/hooks/useHMR.ts
import { useEffect } from 'react';
export const useHMR = () => {
    useEffect(() => {
        if (import.meta.env.MODE === 'development' && module.hot) {
            module.hot.accept('./App', () => {
                // Force update khi module thay đổi
                window.location.reload();
            });
        }
    }, []);
};
