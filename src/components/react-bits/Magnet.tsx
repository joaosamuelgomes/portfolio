import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagnetProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    maxOffset?: number;
}

/**
 * Adapted from React Bits' Magnet component for the portfolio's existing
 * Framer Motion stack. Pointer-only enhancement; touch and reduced-motion
 * users receive the unchanged control.
 */
export const Magnet = ({ children, className = '', strength = 8, maxOffset = 8 }: MagnetProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (shouldReduceMotion || event.pointerType === 'touch' || !rootRef.current) return;

        const rect = rootRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width / 2, 1);
        const relativeY = (event.clientY - (rect.top + rect.height / 2)) / Math.max(rect.height / 2, 1);

        setOffset({
            x: Math.max(-maxOffset, Math.min(maxOffset, relativeX * strength)),
            y: Math.max(-maxOffset, Math.min(maxOffset, relativeY * strength)),
        });
    };

    const reset = () => setOffset({ x: 0, y: 0 });

    return (
        <div
            ref={rootRef}
            className={className}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            onPointerCancel={reset}
        >
            <motion.div
                animate={shouldReduceMotion ? { x: 0, y: 0 } : offset}
                transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
