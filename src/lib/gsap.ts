import { gsap } from 'gsap';
export { gsap };

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
export const fullMotionQuery = '(prefers-reduced-motion: no-preference)';

export const animateWhenVisible = (element: Element, animate: () => void) => {
    if (window.matchMedia(reducedMotionQuery).matches) return () => undefined;

    const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        animate();
    }, { rootMargin: '0px 0px -12% 0px' });

    observer.observe(element);
    return () => observer.disconnect();
};

