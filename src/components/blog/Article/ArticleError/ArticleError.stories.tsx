import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import ArticleError from "./ArticleError";

const meta = {
  title: "blog/Article/ArticleError",
  component: ArticleError,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ArticleError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
