import type { Meta, StoryObj } from '@storybook/react';
import WaveCanvas from './WaveCanvas';

const meta: Meta<typeof WaveCanvas> = {
  title: 'Components/WaveCanvas',
  component: WaveCanvas,
  args: {
    colors: [
      'rgba(255,0,0,0.3)',
      'rgba(0,0,255,0.3)',
      'rgba(0,255,150,0.3)',
      'rgba(255,255,0,0.2)'
    ],
    points: 6,
    speed: 0.04,
    amplitudeMin: 150,
    amplitudeMax: 250
  },
  argTypes: {
    points: { control: { type: 'range', min: 3, max: 20, step: 1 } },
    speed: { control: { type: 'range', min: 0.005, max: 0.2, step: 0.005 } },
    amplitudeMin: { control: { type: 'range', min: 0, max: 400, step: 5 } },
    amplitudeMax: { control: { type: 'range', min: 0, max: 600, step: 5 } },
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof WaveCanvas>;

export const Default: Story = {};
