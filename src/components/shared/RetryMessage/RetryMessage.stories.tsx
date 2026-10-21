import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import RetryMessage from "./RetryMessage";

const meta = {
  title: "shared/RetryMessage",
  component: RetryMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    message: "Sorry, this could not be loaded. Please try again.",
    retryLabel: "Try again",
    onRetry: fn(),
  },
} satisfies Meta<typeof RetryMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongMessage: Story = {
  args: {
    message: "Sorry, the connection broke while loading. ".repeat(8),
  },
};
