import type { Meta, StoryObj } from "@storybook/react-vite";

import ContactCard from "./ContactCard";

const meta = {
  title: "contact/ContactCard",
  component: ContactCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    kind: "github",
    label: "GitHub",
    href: "https://github.com/KaluznyLukasz",
    hint: "Browse the code I write",
  },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    kind: "email",
    label: "Email",
    href: "mailto:hello@example.com",
    hint: "Write to me directly",
  },
};
