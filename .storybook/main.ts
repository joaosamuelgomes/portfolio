import type { StorybookConfig } from '@storybook/react-vite';

// The project's vite.config.ts is merged in, so Tailwind, the "@" alias and the content
// snapshot (built from content/) work in stories exactly as in the site.
const config: StorybookConfig = {
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
    addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
    staticDirs: ['../public'],
    core: { disableTelemetry: true },
};

export default config;
