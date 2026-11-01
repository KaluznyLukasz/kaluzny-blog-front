import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Mail } from "lucide-react";
import { MemoryRouter } from "react-router";

import ButtonLink from "./ButtonLink";

const meta = {
  title: "shared/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    to: "/portfolio",
    children: "View my work",
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    RightIcon: <ArrowRight />,
  },
};

export const Inverted: Story = {
  args: {
    variant: "inverted",
  },
  decorators: [
    (Story) => (
      <div className="rounded-4xl bg-gi-primary p-8">
        <Story />
      </div>
    ),
  ],
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    LeftIcon: <Mail />,
    children: "Get in touch",
  },
};
