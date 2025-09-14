import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Card Title'
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: 'This is a card body with some text.'
  }
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <span>Header content</span>,
    children: 'The card can also have a footer area.',
    footer: <Button variant="primary">Action</Button>
  }
};

