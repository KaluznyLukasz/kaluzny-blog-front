import type { Meta, StoryObj } from "@storybook/react-vite";

import ArticleSection from "./ArticleSection";

const meta = {
  title: "blog/Blog/ArticleFeed/ArticleSection",
  component: ArticleSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "My first month with Docker",
    content:
      "Everything in this project runs in containers, including npm. It felt strange for a week and then I stopped caring about which Node.js version is on my laptop.",
    publishedAt: "2025-02-14T12:30:00.000Z",
    side: "right",
    accent: "primary",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-5xl flex-col wrap-anywhere">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};

export const Left: Story = {
  args: {
    side: "left",
    accent: "orange",
  },
};

export const LongContent: Story = {
  args: {
    content:
      "The beginning of a long article is cut after four lines, so the page stays easy to scan. ".repeat(
        12,
      ),
  },
};

export const LongTitle: Story = {
  args: {
    title: "Wolfeschlegelsteinhausenbergerdorff".repeat(4),
  },
};
