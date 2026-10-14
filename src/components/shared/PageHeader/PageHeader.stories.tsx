import type { Meta, StoryObj } from "@storybook/react-vite";

import PageHeader from "./PageHeader";

const meta = {
  title: "shared/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Portfolio",
    description: "Things I have built so far.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title: "Averyveryveryveryveryveryveryveryveryveryveryveryverylongpagetitle",
  },
};
