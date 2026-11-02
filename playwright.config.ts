import { defineConfig, devices } from '@playwright/test';

const port = 4173;

export default defineConfig({
    testDir: 'tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
    use: {
        baseURL: `http://localhost:${port}`,
        // The site honors reduced motion, which keeps GSAP reveals from racing the assertions.
        contextOptions: { reducedMotion: 'reduce' },
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    webServer: {
        // Production bundle with drafts, so article pages exist even before the first one is published.
        command: `npx vite build --outDir dist-e2e && npx vite preview --outDir dist-e2e --port ${port} --strictPort`,
        env: { CONTENT_DRAFTS: '1' },
        url: `http://localhost:${port}`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
