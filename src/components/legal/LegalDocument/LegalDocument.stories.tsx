import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import LegalDocument from "./LegalDocument";

const meta = {
  title: "legal/LegalDocument",
  component: LegalDocument,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Privacy policy",
    description: "What happens to your data when you visit this website.",
    updatedAt: "2026-10-31",
    sections: [
      {
        title: "Who is responsible for your data",
        paragraphs: ["This website is run by a private person."],
        links: [{ label: "Contact page", to: "/contact" }],
      },
      {
        title: "In short",
        paragraphs: ["This website is built to collect as little as possible:"],
        items: ["There are no accounts.", "It sets no cookies."],
      },
    ],
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="mx-auto flex max-w-5xl flex-col gap-10 wrap-anywhere">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LegalDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
