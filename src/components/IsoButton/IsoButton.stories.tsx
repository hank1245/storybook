import type { Meta, StoryObj } from '@storybook/react';
import IsoButton, { IsoButtonGroup } from './IsoButton';

const meta: Meta<typeof IsoButton> = {
  title: 'Components/IsoButton',
  component: IsoButton,
  parameters: { layout: 'centered' }
};

export default meta;
type Story = StoryObj<typeof IsoButton>;

// Group story
export const Group: Story = {
  render: () => <IsoButtonGroup />
};
