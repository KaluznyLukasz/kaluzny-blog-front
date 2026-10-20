import type { Meta, StoryObj } from "@storybook/react-vite";

import ContactList from "./ContactList";

const meta = {
  title: "shared/SiteFooter/ContactList",
  component: ContactList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    contacts: [
      { kind: "email", label: "Email", href: "mailto:hello@example.com" },
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/KaluznyLukasz",
      },
      { kind: "website", label: "Website", href: "https://example.com" },
    ],
  },
} satisfies Meta<typeof ContactList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllKinds: Story = {};

export const GitHubOnly: Story = {
  args: {
    contacts: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/KaluznyLukasz",
      },
    ],
  },
};
