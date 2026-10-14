import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import PageLayout from "../../shared/PageLayout/PageLayout";
import Blog from "./Blog";

const meta = {
  title: "blog/Blog",
  component: Blog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
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

export const Default: Story = {};
