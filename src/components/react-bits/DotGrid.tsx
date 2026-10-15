import { useEffect, useRef, type CSSProperties } from 'react';

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    shockColor?: string;
    proximity?: number;
    opacity?: number;
    className?: string;
    style?: CSSProperties;
}

interface Dot {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    velocityX: number;
    velocityY: number;
    pulse: number;
}

const parseHex = (value: string) => {
    const hex = value.replace('#', '');
    const normalized = hex.length === 3 ? hex.replace(/./g, (digit) => digit + digit) : hex;
    return {
        red: Number.parseInt(normalized.slice(0, 2), 16),
        green: Number.parseInt(normalized.slice(2, 4), 16),
        blue: Number.parseInt(normalized.slice(4, 6), 16),
    };
};

/**
 * Lightweight local adaptation of React Bits' Dot Grid. The original WebGL
 * concept is preserved while this version uses an on-demand 2D canvas loop
 * to match the portfolio's existing dependency and performance budget.
 */
export const DotGrid = ({
    dotSize = 1.35,
    gap = 27,
    baseColor = '#343640',
    activeColor = '#00f0ff',
    shockColor = '#ccff00',
    proximity = 150,
    opacity = 0.5,
    className = '',
    style,
}: DotGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const base = parseHex(baseColor);
        const active = parseHex(activeColor);
        const shock = parseHex(shockColor);
        const pointer = { x: 0, y: 0, lastX: 0, lastY: 0, inside: false };
        let dots: Dot[] = [];
        let width = 1;
        let height = 1;
        let dpr = 1;
        let frame = 0;
        let lastTime = 0;
        let visible = true;

        const draw = () => {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            context.beginPath();
            dots.forEach((dot) => {
                context.moveTo(dot.x + dot.offsetX + dotSize, dot.y + dot.offsetY);
                context.arc(dot.x + dot.offsetX, dot.y + dot.offsetY, dotSize, 0, Math.PI * 2);
            });
            context.fillStyle = `rgba(${base.red}, ${base.green}, ${base.blue}, ${opacity})`;
            context.fill();

            if (reducedMotion) return;

            dots.forEach((dot) => {
                const distance = pointer.inside ? Math.hypot(dot.x + dot.offsetX - pointer.x, dot.y + dot.offsetY - pointer.y) : Infinity;
                const hoverEnergy = distance < proximity ? Math.pow(1 - distance / proximity, 2) : 0;
                const movementEnergy = Math.min(1, Math.hypot(dot.offsetX, dot.offsetY) / 12 + Math.hypot(dot.velocityX, dot.velocityY) / 18);
                const energy = Math.max(hoverEnergy * 0.72, movementEnergy, dot.pulse);
                if (energy < 0.025) return;

                const color = dot.pulse > Math.max(hoverEnergy, movementEnergy) ? shock : active;
                context.beginPath();
                context.arc(
                    dot.x + dot.offsetX,
                    dot.y + dot.offsetY,
                    dotSize * (1 + energy * 1.15),
                    0,
                    Math.PI * 2,
                );
                context.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${Math.min(0.9, opacity + energy * 0.38)})`;
                context.fill();
            });
        };

        const isSettled = () => dots.every((dot) => (
            Math.abs(dot.offsetX) < 0.02
            && Math.abs(dot.offsetY) < 0.02
            && Math.abs(dot.velocityX) < 0.02
            && Math.abs(dot.velocityY) < 0.02
            && dot.pulse < 0.02
        ));

        const animate = (time: number) => {
            frame = 0;
            if (!visible) return;
            const elapsed = Math.min(2, (time - lastTime) / 16.67 || 1);
            lastTime = time;
            const damping = Math.pow(0.82, elapsed);

            dots.forEach((dot) => {
                dot.velocityX += -dot.offsetX * 0.12 * elapsed;
                dot.velocityY += -dot.offsetY * 0.12 * elapsed;
                dot.velocityX *= damping;
                dot.velocityY *= damping;
                dot.offsetX += dot.velocityX * elapsed;
                dot.offsetY += dot.velocityY * elapsed;
                dot.pulse *= Math.pow(0.88, elapsed);
            });

            draw();
            if (!isSettled()) frame = window.requestAnimationFrame(animate);
        };

        const wake = () => {
            if (reducedMotion || frame || !visible) return;
            lastTime = performance.now();
            frame = window.requestAnimationFrame(animate);
        };

        const rebuild = () => {
            const rect = canvas.getBoundingClientRect();
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            const cell = dotSize + gap;
            const columns = Math.ceil(width / cell) + 1;
            const rows = Math.ceil(height / cell) + 1;
            const offsetX = (width - (columns - 1) * cell) / 2;
            const offsetY = (height - (rows - 1) * cell) / 2;
            dots = [];

            for (let row = 0; row < rows; row += 1) {
                for (let column = 0; column < columns; column += 1) {
                    dots.push({
                        x: offsetX + column * cell,
                        y: offsetY + row * cell,
                        offsetX: 0,
                        offsetY: 0,
                        velocityX: 0,
                        velocityY: 0,
                        pulse: 0,
                    });
                }
            }

            draw();
        };

        const handlePointerMove = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return;
            const wasInside = pointer.inside;
            const deltaX = wasInside ? event.clientX - pointer.lastX : 0;
            const deltaY = wasInside ? event.clientY - pointer.lastY : 0;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.lastX = event.clientX;
            pointer.lastY = event.clientY;
            pointer.inside = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;

            if (wasInside && pointer.inside) {
                dots.forEach((dot) => {
                    const distance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
                    if (distance >= proximity) return;
                    const influence = Math.pow(1 - distance / proximity, 2) * 0.16;
                    dot.velocityX += deltaX * influence;
                    dot.velocityY += deltaY * influence;
                });
            }

            draw();
            wake();
        };

        const handlePointerDown = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return;
            const radius = 230;
            dots.forEach((dot) => {
                const deltaX = dot.x - event.clientX;
                const deltaY = dot.y - event.clientY;
                const distance = Math.hypot(deltaX, deltaY);
                if (distance <= 0 || distance >= radius) return;
                const influence = Math.pow(1 - distance / radius, 2);
                dot.velocityX += (deltaX / distance) * influence * 7;
                dot.velocityY += (deltaY / distance) * influence * 7;
                dot.pulse = Math.max(dot.pulse, influence);
            });
            wake();
        };

        const handlePointerOut = (event: PointerEvent) => {
            if (event.relatedTarget) return;
            pointer.inside = false;
            draw();
        };

        const resizeObserver = new ResizeObserver(rebuild);
        resizeObserver.observe(canvas);

        const handleVisibility = () => {
            visible = !document.hidden;
            if (!visible) {
                window.cancelAnimationFrame(frame);
                frame = 0;
            } else {
                draw();
            }
        };

        if (!reducedMotion) {
            window.addEventListener('pointermove', handlePointerMove, { passive: true });
            window.addEventListener('pointerdown', handlePointerDown, { passive: true });
            window.addEventListener('pointerout', handlePointerOut);
        }
        document.addEventListener('visibilitychange', handleVisibility);
        rebuild();

        return () => {
            window.cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerout', handlePointerOut);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [activeColor, baseColor, dotSize, gap, opacity, proximity, shockColor]);

    return (
        <div className={`relative h-full w-full ${className}`.trim()} style={style}>
            <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
        </div>
    );
};
