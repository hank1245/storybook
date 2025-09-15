import type { Meta, StoryObj } from "@storybook/react";
import BoxLoading from "./BoxLoading";

const meta: Meta<typeof BoxLoading> = {
  title: "Components/BoxLoading",
  component: BoxLoading,
  args: {
    background: "#f9f9f9",
    boxSize: 50,
    color: "#1a6844",
    duration: 0.5,
    text: "Loading..",
    textColor: "#6136ca",
    fontSize: "18px",
    fullScreen: true,
  },
  argTypes: {
    boxSize: { control: { type: "range", min: 20, max: 120, step: 1 } },
    duration: { control: { type: "range", min: 0.2, max: 2, step: 0.1 } },
    fullScreen: { control: "boolean" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BoxLoading>;

export const Default: Story = {};
