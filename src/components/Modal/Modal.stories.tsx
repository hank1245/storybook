import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    isOpen: true,
    title: 'Example Modal',
    onClose: fn()
  },
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    children: (
      <div>
        <p>Modal content goes here.</p>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <Button>Okay</Button>
        </div>
      </div>
    )
  }
};

