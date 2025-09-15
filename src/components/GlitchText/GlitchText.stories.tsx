import type { Meta, StoryObj } from '@storybook/react';
import GlitchText from './GlitchText';

const meta: Meta<typeof GlitchText> = {
  title: 'Components/GlitchText',
  component: GlitchText,
  args: {
    text: 'GLITCH',
    fontSize: '96px',
    width: '420px',
    steps: 20,
    maxClip: 100,
    speed1: 2,
    speed2: 3,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof GlitchText>;

export const Default: Story = {};

export const Fast: Story = {
  args: {
    speed1: 1.2,
    speed2: 1.6,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#ff00aa',
  },
};
