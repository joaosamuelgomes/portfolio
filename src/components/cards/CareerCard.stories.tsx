import type { Meta, StoryObj } from '@storybook/react-vite';
import { CAREER_DATA } from '../../data/content';
import { CareerCard } from './CareerCard';

const meta = {
    title: 'Cards/CareerCard',
    component: CareerCard,
    decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
    args: { data: CAREER_DATA[0], index: 0 },
} satisfies Meta<typeof CareerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Atual: Story = {};

export const Anterior: Story = {
    args: { data: CAREER_DATA[1], index: 1 },
};
