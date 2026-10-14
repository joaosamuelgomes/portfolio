import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent as ReactPointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
    spotlightColor?: string;
    spotlightSize?: number;
}

type SpotlightStyle = CSSProperties & {
    '--spotlight-x': string;
    '--spotlight-y': string;
    '--spotlight-color': string;
    '--spotlight-size': string;
};

/**
 * Adapted from React Bits' Spotlight Card. The effect is intentionally subtle
 * and rectangular to match the established neo-brutalist system.
 */
export const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(204, 255, 0, 0.10)',
    spotlightSize = 320,
    ...props
}: SpotlightCardProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const setPosition = (x: number, y: number) => {
        rootRef.current?.style.setProperty('--spotlight-x', `${x}px`);
        rootRef.current?.style.setProperty('--spotlight-y', `${y}px`);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (shouldReduceMotion || event.pointerType === 'touch' || !rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        setPosition(event.clientX - rect.left, event.clientY - rect.top);
    };

    const style: SpotlightStyle = {
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
        '--spotlight-color': spotlightColor,
        '--spotlight-size': `${spotlightSize}px`,
    };

    return (
        <div
            ref={rootRef}
            className={`spotlight-card ${className}`}
            style={style}
            onPointerMove={handlePointerMove}
            {...props}
        >
            <span className="spotlight-card__light" aria-hidden="true" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
