import type { Meta, StoryObj } from "@storybook/react-vite";

import DateTile from "./DateTile";

const meta = {
  title: "blog/Blog/ArticleFeed/ArticleSection/DateTile",
  component: DateTile,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    publishedAt: "2025-04-02T08:15:00.000Z",
    accent: "primary",
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Orange: Story = {
  args: {
    accent: "orange",
  },
};

export const Secondary: Story = {
  args: {
    accent: "secondary",
  },
};

export const Blue: Story = {
  args: {
    accent: "blue",
  },
};
