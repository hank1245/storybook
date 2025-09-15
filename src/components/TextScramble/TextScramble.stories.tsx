import type { Meta, StoryObj } from '@storybook/react';
import TextScramble from './TextScramble';

const meta: Meta<typeof TextScramble> = {
  title: 'Components/TextScramble',
  component: TextScramble,
  args: {
    phrases: ['HELLO', 'WELCOME', 'TEXT SCRAMBLE'],
    interval: 800,
    fontSize: '28px',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TextScramble>;

export const Default: Story = {};

export const Fast: Story = {
  args: {
    interval: 400,
  },
};

export const Large: Story = {
  args: {
    fontSize: '48px',
  },
};
