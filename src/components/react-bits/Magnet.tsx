import { useRef, type HTMLAttributes, type PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from '../../lib/gsap';

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
    strength?: number;
    maxOffset?: number;
}

/**
 * Adapted from React Bits' Magnet component for the portfolio's existing
 * GSAP stack. Pointer-only enhancement; touch and reduced-motion
 * users receive the unchanged control.
 */
export const Magnet = ({ children, className = '', strength = 8, maxOffset = 8, ...props }: MagnetProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            event.pointerType === 'touch' ||
            !rootRef.current ||
            !targetRef.current
        ) return;

        const rect = rootRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width / 2, 1);
        const relativeY = (event.clientY - (rect.top + rect.height / 2)) / Math.max(rect.height / 2, 1);

        const offset = {
            x: Math.max(-maxOffset, Math.min(maxOffset, relativeX * strength)),
            y: Math.max(-maxOffset, Math.min(maxOffset, relativeY * strength)),
        };

        gsap.to(targetRef.current, { ...offset, duration: 0.28, ease: 'power3.out', overwrite: true });
    };

    const reset = () => {
        if (targetRef.current) {
            gsap.to(targetRef.current, { x: 0, y: 0, duration: 0.35, ease: 'power3.out', overwrite: true });
        }
    };

    return (
        <div
            ref={rootRef}
            className={className}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            onPointerCancel={reset}
            {...props}
        >
            <div ref={targetRef}>
                {children}
            </div>
        </div>
    );
};
