import type { Meta, StoryObj } from "@storybook/react-vite";

import CopyLinkButton from "./CopyLinkButton";

const meta = {
  title: "blog/Article/CopyLinkButton",
  component: CopyLinkButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CopyLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
