import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
    cleanup();
});

// Node-environment suites (scripts/*.test.mjs) share this setup but have no DOM.
const hasDom = typeof window !== 'undefined';

// jsdom has no layout engine; GSAP and the reveal helpers only need these to exist.
if (hasDom && !window.matchMedia) {
    window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
    });
}

if (hasDom && !window.IntersectionObserver) {
    window.IntersectionObserver = class {
        readonly root = null;
        readonly rootMargin = '';
        readonly thresholds = [];
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    };
}

if (hasDom) window.scrollTo = () => undefined;
