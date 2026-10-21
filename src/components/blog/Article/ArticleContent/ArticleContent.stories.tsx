import type { Meta, StoryObj } from "@storybook/react-vite";

import ArticleContent from "./ArticleContent";

const meta = {
  title: "blog/Article/ArticleContent",
  component: ArticleContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "My first month with Docker",
    content:
      "Everything in this project runs in containers, including npm. It felt strange for a week and then I stopped caring about which Node.js version is on my laptop.\n\nThe biggest surprise was how little I had to learn. A Dockerfile is a list of steps, and a compose file is a list of services.\n\nNext month I want to understand what really happens when a container starts.",
    publishedAt: "2025-02-14T12:30:00.000Z",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-5xl flex-col wrap-anywhere">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHtmlInContent: Story = {
  args: {
    content:
      '<script>alert("This never runs")</script>\n<b>Not bold</b> and <img src="x" onerror="alert(1)">\n\nThe visitor reads the text exactly as it was written.',
  },
};

export const LongTitle: Story = {
  args: {
    title: "Wolfeschlegelsteinhausenbergerdorff".repeat(4),
  },
};

export const LongContent: Story = {
  args: {
    content: Array.from(
      { length: 12 },
      (_, index) =>
        `Paragraph ${index + 1}. The whole article is shown, so a long text simply makes the page longer and the visitor scrolls to read it.`,
    ).join("\n\n"),
  },
};

export const LongWord: Story = {
  args: {
    content: `A very long word wraps instead of overflowing: ${"Supercalifragilistic".repeat(8)}`,
  },
};
