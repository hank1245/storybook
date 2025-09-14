import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { fn } from '@storybook/test';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  args: {
    items: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' }
    ],
    currentId: 'home',
    onNavigate: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Basic: Story = {};

