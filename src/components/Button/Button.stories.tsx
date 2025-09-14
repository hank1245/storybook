import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
    disabled: false
  },
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcons: Story = {
  args: {
    leadingIcon: <span aria-hidden={true}>⬇️</span>,
    trailingIcon: <span aria-hidden={true}>➡️</span>,
    children: 'Download'
  }
};
