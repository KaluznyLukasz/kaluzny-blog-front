import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail } from "lucide-react";

import TextLink from "./TextLink";

const meta = {
  title: "portfolio/Portfolio/ProjectCard/TextLink",
  component: TextLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    href: "https://github.com/KaluznyLukasz",
    children: "github.com/KaluznyLukasz",
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    href: "mailto:hello@example.com",
    children: "hello@example.com",
    LeftIcon: <Mail />,
  },
};

export const LongText: Story = {
  args: {
    children:
      "github.com/averyveryveryveryveryveryveryveryveryverylongusername/averyveryveryverylongrepositoryname",
    LeftIcon: <Mail />,
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
};
