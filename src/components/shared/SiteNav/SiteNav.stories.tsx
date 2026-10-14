import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import SiteNav from "./SiteNav";

const meta = {
  title: "shared/SiteNav",
  component: SiteNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const atPath =
  (path: string): Decorator =>
  (Story) => (
    <MemoryRouter initialEntries={[path]}>
      <Story />
    </MemoryRouter>
  );

export const OnAboutMe: Story = {
  decorators: atPath("/"),
};

export const OnPortfolio: Story = {
  decorators: atPath("/portfolio"),
};

export const OnBlog: Story = {
  decorators: atPath("/blog"),
};
