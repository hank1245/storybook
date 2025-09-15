import type { Meta, StoryObj } from '@storybook/react';
import ForceGraph, { defaultForceGraphData } from './ForceGraph';

const meta: Meta<typeof ForceGraph> = {
  title: 'Components/ForceGraph',
  component: ForceGraph,
  args: {
    width: 500,
    height: 480,
    linkDistance: 80,
    chargeStrength: -300,
    collisionRadius: 25,
    labelTruncate: 12,
    showLabels: true,
    data: defaultForceGraphData
  },
  argTypes: {
    width: { control: { type: 'range', min: 300, max: 900, step: 10 } },
    height: { control: { type: 'range', min: 300, max: 900, step: 10 } },
    linkDistance: { control: { type: 'range', min: 20, max: 200, step: 5 } },
    chargeStrength: { control: { type: 'range', min: -600, max: 0, step: 10 } },
    collisionRadius: { control: { type: 'range', min: 5, max: 80, step: 1 } },
    labelTruncate: { control: { type: 'range', min: 6, max: 20, step: 1 } },
    showLabels: { control: 'boolean' },
    data: { control: 'object' }
  },
  parameters: { layout: 'padded' }
};

export default meta;
type Story = StoryObj<typeof ForceGraph>;

export const Default: Story = {};
