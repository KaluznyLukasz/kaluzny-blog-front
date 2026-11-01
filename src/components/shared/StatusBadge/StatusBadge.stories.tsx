import type { Meta, StoryObj } from "@storybook/react-vite";

import StatusBadge from "./StatusBadge";

const meta = {
  title: "shared/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    type: "success",
    children: "Done",
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Info: Story = {
  args: {
    type: "info",
    children: "In progress",
  },
};

export const Default: Story = {
  args: {
    type: "default",
    children: "Up next",
  },
};
