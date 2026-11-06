import type { Meta, StoryObj } from "@storybook/react-vite";

import CopyEmailButton from "./CopyEmailButton";

const meta = {
  title: "contact/Contact/DirectContact/CopyEmailButton",
  component: CopyEmailButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="rounded-3xl bg-gi-primary p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyEmailButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
