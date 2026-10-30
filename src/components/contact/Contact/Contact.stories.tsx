import type { Meta, StoryObj } from "@storybook/react-vite";

import Contact from "./Contact";

const meta = {
  title: "contact/Contact",
  component: Contact,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-5xl flex-col gap-10 wrap-anywhere">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
