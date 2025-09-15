import type { Meta, StoryObj } from "@storybook/react";
import TypingEffect from "./TypingEffect";

const meta: Meta<typeof TypingEffect> = {
  title: "Components/TypingEffect",
  component: TypingEffect,
  args: {
    text: "You can type anything you want.",
    speed: 12,
    center: true,
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TypingEffect>;

export const Default: Story = {};

export const Fast: Story = {
  args: {
    speed: 22,
  },
};

export const Slow: Story = {
  args: {
    speed: 6,
  },
};
