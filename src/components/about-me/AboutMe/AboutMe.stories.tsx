import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import PageLayout from "../../shared/PageLayout/PageLayout";
import AboutMe from "./AboutMe";

const meta = {
  title: "about-me/AboutMe",
  component: AboutMe,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <PageLayout>
          <Story />
        </PageLayout>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AboutMe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
