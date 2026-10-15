import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent as ReactPointerEvent } from 'react';

interface GlareHoverProps extends HTMLAttributes<HTMLDivElement> {
    glareColor?: string;
}

/**
 * Lightweight local adaptation of React Bits' Glare Hover. The sweep runs
 * once on pointer entry and never tracks the cursor continuously.
 */
export const GlareHover = ({
    children,
    className = '',
    glareColor = 'rgba(0, 240, 255, 0.14)',
    ...props
}: GlareHoverProps) => {
    const sweepRef = useRef<HTMLSpanElement>(null);

    const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (
            event.pointerType === 'touch' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !sweepRef.current
        ) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const entersFromLeft = event.clientX <= rect.left + rect.width / 2;
        const sweep = sweepRef.current;
        sweep.style.setProperty('--glare-from', entersFromLeft ? '-220%' : '520%');
        sweep.style.setProperty('--glare-to', entersFromLeft ? '520%' : '-220%');
        sweep.style.animation = 'none';
        void sweep.offsetWidth;
        sweep.style.animation = 'glare-hover-sweep 700ms cubic-bezier(0.16, 1, 0.3, 1) both';
    };

    return (
        <div
            className={`glare-hover relative isolate overflow-hidden ${className}`.trim()}
            onPointerEnter={handlePointerEnter}
            {...props}
        >
            <span
                ref={sweepRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-[-30%] left-0 z-0 w-[28%] -skew-x-12 opacity-0 blur-[2px]"
                style={{
                    background: `linear-gradient(90deg, transparent, ${glareColor}, transparent)`,
                } as CSSProperties}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
