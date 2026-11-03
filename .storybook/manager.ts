import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'Made by João Gomes · Design system',
        brandUrl: 'https://madebyjoaogomes.com',
        colorPrimary: '#ccff00',
        colorSecondary: '#00f0ff',
        appBg: '#08080c',
        appContentBg: '#08080c',
        appPreviewBg: '#08080c',
        appBorderColor: '#1a1c24',
        barBg: '#0d0e14',
        fontBase: '"Space Grotesk", sans-serif',
        fontCode: '"JetBrains Mono", monospace',
    }),
});
