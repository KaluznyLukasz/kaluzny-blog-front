import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { mocked } from "storybook/test";

import { getArticle } from "../../../services/api/client/getArticle";
import type { Article as ArticleData } from "../../../services/api/schemas/article";
import { ApiError } from "../../../services/api/utils/apiError";
import PageLayout from "../../shared/PageLayout/PageLayout";
import Article from "./Article";

const ARTICLE: ArticleData = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content:
    "Everything in this project runs in containers, including npm. It felt strange for a week and then I stopped caring about which Node.js version is on my laptop.\n\nThe biggest surprise was how little I had to learn. A Dockerfile is a list of steps, and a compose file is a list of services.\n\nNext month I want to understand what really happens when a container starts.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const meta = {
  title: "blog/Article",
  component: Article,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: ARTICLE.id,
  },
  beforeEach: () => {
    mocked(getArticle).mockResolvedValue(ARTICLE);
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[`/articles/${args.id}`]}>
        <PageLayout>
          <Story />
        </PageLayout>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticle: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getArticle).mockReturnValue(new Promise(() => {}));
  },
};

export const WithHtmlInContent: Story = {
  beforeEach: () => {
    mocked(getArticle).mockResolvedValue({
      ...ARTICLE,
      content:
        '<script>alert("This never runs")</script>\n<b>Not bold</b> and <img src="x" onerror="alert(1)">\n\nThe visitor reads the text exactly as it was written.',
    });
  },
};

export const LongArticle: Story = {
  beforeEach: () => {
    mocked(getArticle).mockResolvedValue({
      ...ARTICLE,
      content: Array.from(
        { length: 14 },
        (_, index) =>
          `Paragraph ${index + 1}. The whole article is shown, so a long text simply makes the page longer and the visitor scrolls to read it.`,
      ).join("\n\n"),
    });
  },
};

export const DoesNotExist: Story = {
  beforeEach: () => {
    mocked(getArticle).mockRejectedValue(
      new ApiError("http", "The API answered with status 404", {
        status: 404,
      }),
    );
  },
};

export const InvalidId: Story = {
  args: {
    id: "123",
  },
};

export const ApiDown: Story = {
  beforeEach: () => {
    mocked(getArticle).mockRejectedValue(
      new ApiError("network", "Unreachable"),
    );
  },
};

export const ApiError500: Story = {
  beforeEach: () => {
    mocked(getArticle).mockRejectedValue(
      new ApiError("http", "The API answered with status 500", {
        status: 500,
      }),
    );
  },
};

export const WrongShape: Story = {
  beforeEach: () => {
    mocked(getArticle).mockRejectedValue(
      new ApiError("invalid-response", "The API answer does not match"),
    );
  },
};

export const WorksOnSecondTry: Story = {
  beforeEach: () => {
    mocked(getArticle)
      .mockRejectedValueOnce(new ApiError("network", "Unreachable"))
      .mockResolvedValue(ARTICLE);
  },
};
