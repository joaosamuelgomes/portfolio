import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { themes } from 'storybook/theming';
import '../src/index.css';

const preview: Preview = {
    // A docs page per component, built from its stories and props.
    tags: ['autodocs'],
    // Cards and the header link with react-router; stories render without a real URL.
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'padded',
        backgrounds: {
            options: { dark: { name: 'Fundo', value: '#08080c' }, panel: { name: 'Painel', value: '#0d0e14' } },
        },
        // Fails the a11y panel on violations, the same bar as the axe checks in the e2e tests.
        a11y: { test: 'error' },
        controls: { expanded: true },
        // The components are designed for the dark background only.
        docs: { toc: true, theme: themes.dark },
    },
    initialGlobals: {
        backgrounds: { value: 'dark' },
    },
};

export default preview;
