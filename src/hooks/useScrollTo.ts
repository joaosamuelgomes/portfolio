import { useCallback } from 'react';

export const useScrollTo = () => {
    const scrollToId = useCallback((id: string) => {
    const element = document.querySelector(id);
        if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, []);

    return scrollToId;
};