import { useEffect, useMemo, useState } from 'react';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    delay?: number;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}';

/**
 * Local, dependency-free adaptation of React Bits' Decrypted Text.
 * It runs once after mount, then leaves the final text stable so the
 * background remains the page's only continuous pointer interaction.
 */
export const DecryptedText = ({
    text,
    speed = 44,
    delay = 300,
    characters = DEFAULT_CHARACTERS,
    className = '',
    encryptedClassName = 'text-[#00f0ff]',
}: DecryptedTextProps) => {
    const sourceCharacters = useMemo(() => Array.from(text), [text]);
    const decryptableIndices = useMemo(
        () => sourceCharacters.flatMap((character, index) => character.trim() ? [index] : []),
        [sourceCharacters],
    );
    const [displayText, setDisplayText] = useState(text);
    const [revealedCount, setRevealedCount] = useState(decryptableIndices.length);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || decryptableIndices.length === 0) {
            return;
        }

        const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)] ?? '';
        const composeFrame = (count: number) => {
            const revealed = new Set(decryptableIndices.slice(0, count));
            return sourceCharacters
                .map((character, index) => character.trim() && !revealed.has(index) ? randomCharacter() : character)
                .join('');
        };

        let currentCount = 0;
        let intervalId = 0;
        const timeoutId = window.setTimeout(() => {
            setRevealedCount(0);
            setDisplayText(composeFrame(0));

            intervalId = window.setInterval(() => {
                currentCount += 1;
                setRevealedCount(currentCount);
                setDisplayText(composeFrame(currentCount));

                if (currentCount >= decryptableIndices.length) {
                    window.clearInterval(intervalId);
                    setDisplayText(text);
                }
            }, speed);
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(intervalId);
        };
    }, [characters, decryptableIndices, delay, sourceCharacters, speed, text]);

    const revealedIndices = useMemo(
        () => new Set(decryptableIndices.slice(0, revealedCount)),
        [decryptableIndices, revealedCount],
    );

    return (
        <span className={`inline-block whitespace-nowrap ${className}`.trim()}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {Array.from(displayText).map((character, index) => (
                    <span
                        key={index}
                        className={revealedIndices.has(index) || !character.trim() ? '' : encryptedClassName}
                    >
                        {character}
                    </span>
                ))}
            </span>
        </span>
    );
};
