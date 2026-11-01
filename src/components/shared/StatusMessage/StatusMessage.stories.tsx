import type { Meta, StoryObj } from "@storybook/react-vite";

import StatusMessage from "./StatusMessage";

const meta = {
  title: "shared/StatusMessage",
  component: StatusMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    variant: "info",
    role: "status",
    children: "There are no articles yet. Check back soon!",
  },
} satisfies Meta<typeof StatusMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoStatus: Story = {};

export const ErrorAlert: Story = {
  args: {
    variant: "error",
    role: "alert",
    children: "Sorry, this could not be loaded. Please try again.",
  },
};
