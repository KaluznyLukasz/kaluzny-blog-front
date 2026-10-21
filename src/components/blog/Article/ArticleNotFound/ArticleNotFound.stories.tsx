import type { Meta, StoryObj } from "@storybook/react-vite";

import ArticleNotFound from "./ArticleNotFound";

const meta = {
  title: "blog/Article/ArticleNotFound",
  component: ArticleNotFound,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-3xl flex-col wrap-anywhere">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
