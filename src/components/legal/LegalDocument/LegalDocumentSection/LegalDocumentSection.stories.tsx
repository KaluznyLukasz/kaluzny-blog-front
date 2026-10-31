import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import LegalDocumentSection from "./LegalDocumentSection";

const meta = {
  title: "legal/LegalDocument/LegalDocumentSection",
  component: LegalDocumentSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Your rights",
    paragraphs: ["Under the GDPR, you have the right to:"],
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LegalDocumentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParagraphsOnly: Story = {};

export const WithItems: Story = {
  args: {
    items: [
      "access your data and get a copy of it,",
      "have incorrect data corrected,",
      "have your data deleted.",
    ],
  },
};

export const WithLinks: Story = {
  args: {
    links: [
      { label: "Contact page", to: "/contact" },
      {
        label: "Personal Data Protection Office",
        to: "https://uodo.gov.pl/en",
      },
    ],
  },
};
