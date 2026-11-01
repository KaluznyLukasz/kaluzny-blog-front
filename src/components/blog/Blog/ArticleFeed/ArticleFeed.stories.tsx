import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { fn } from "storybook/test";

import coverImage from "../../../../assets/images/skiatos.jpeg";
import ArticleFeed from "./ArticleFeed";

const meta = {
  title: "blog/Blog/ArticleFeed",
  component: ArticleFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    state: {
      status: "success",
      articles: [
        {
          id: "5e1f0a2b-0005-4000-8000-000000000005",
          title: "Scenarios are documentation that runs",
          content:
            "A Gherkin scenario describes behaviour in plain words and then checks it against the running app.",
          publishedAt: "2025-04-02T08:15:00.000Z",
        },
        {
          id: "5e1f0a2b-0002-4000-8000-000000000002",
          title: "My first month with Docker",
          content:
            "Everything in this project runs in containers, including npm.",
          publishedAt: "2025-02-14T12:30:00.000Z",
        },
        {
          id: "5e1f0a2b-0001-4000-8000-000000000001",
          title: "Hello, world: why I started this blog",
          content: "I want a place to write down what I learn.",
          publishedAt: "2025-01-10T09:00:00.000Z",
        },
      ],
    },
    onRetry: fn(),
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="mx-auto flex max-w-5xl flex-col gap-10 wrap-anywhere lg:gap-14">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ArticleFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {};

export const WithCoverImages: Story = {
  args: {
    state: {
      status: "success",
      articles: [
        {
          id: "5e1f0a2b-0005-4000-8000-000000000005",
          title: "1 September 2023: the day everything started",
          content:
            "Today the new school year begins, and with it a project I have wanted to build for a long time.",
          publishedAt: "2023-09-01T12:00:00.000Z",
          imageId: "616ad187-7d8e-4e85-912d-36c743357d1a",
          imageUrl: coverImage,
        },
        {
          id: "5e1f0a2b-0002-4000-8000-000000000002",
          title: "My first month with Docker",
          content:
            "Everything in this project runs in containers, including npm.",
          publishedAt: "2025-02-14T12:30:00.000Z",
          imageId: null,
          imageUrl: null,
        },
        {
          id: "5e1f0a2b-0001-4000-8000-000000000001",
          title: "Hello, world: why I started this blog",
          content: "I want a place to write down what I learn.",
          publishedAt: "2025-01-10T09:00:00.000Z",
          imageId: "616ad187-7d8e-4e85-912d-36c743357d1b",
          imageUrl: coverImage,
        },
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    state: { status: "loading" },
  },
};

export const Empty: Story = {
  args: {
    state: { status: "success", articles: [] },
  },
};

export const LoadingFailed: Story = {
  args: {
    state: { status: "error" },
  },
};

export const LongTitle: Story = {
  args: {
    state: {
      status: "success",
      articles: [
        {
          id: "5e1f0a2b-0006-4000-8000-000000000006",
          title: "Wolfeschlegelsteinhausenbergerdorff".repeat(4),
          content: "A very long title wraps instead of overflowing.",
          publishedAt: "2025-05-01T10:00:00.000Z",
        },
      ],
    },
  },
};
