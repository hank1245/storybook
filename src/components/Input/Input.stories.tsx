import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com'
  },
  parameters: { controls: { expanded: true } }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {};
export const WithHint: Story = { args: { hint: 'We never share your email.' } };
export const ErrorState: Story = { args: { error: 'Email is required' } };

