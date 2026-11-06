import type { Meta, StoryObj } from "@storybook/react-vite";

import DirectContact from "./DirectContact";

const meta = {
  title: "contact/Contact/DirectContact",
  component: DirectContact,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DirectContact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
