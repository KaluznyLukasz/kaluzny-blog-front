import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { mocked } from "storybook/test";

import { getArticles } from "../../../services/api/client/getArticles";
import type { Article } from "../../../services/api/schemas/article";
import { ApiError } from "../../../services/api/utils/apiError";
import PageLayout from "../../shared/PageLayout/PageLayout";
import Blog from "./Blog";

const ARTICLES: Article[] = [
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
    content: "Everything in this project runs in containers, including npm.",
    publishedAt: "2025-02-14T12:30:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I started this blog",
    content: "I want a place to write down what I learn.",
    publishedAt: "2025-01-10T09:00:00.000Z",
  },
];

const meta = {
  title: "blog/Blog",
  component: Blog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getArticles).mockResolvedValue(ARTICLES);
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/blog"]}>
        <PageLayout>
          <Story />
        </PageLayout>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Blog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getArticles).mockReturnValue(new Promise(() => {}));
  },
};

export const Empty: Story = {
  beforeEach: () => {
    mocked(getArticles).mockResolvedValue([]);
  },
};

export const LoadingFailed: Story = {
  beforeEach: () => {
    mocked(getArticles).mockRejectedValue(
      new ApiError("network", "Unreachable"),
    );
  },
};

export const WorksOnSecondTry: Story = {
  beforeEach: () => {
    mocked(getArticles)
      .mockRejectedValueOnce(new ApiError("network", "Unreachable"))
      .mockResolvedValue(ARTICLES);
  },
};
