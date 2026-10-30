import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import ContactCta from "./ContactCta";

const meta = {
  title: "shared/ContactCta",
  component: ContactCta,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="mx-auto max-w-5xl">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ContactCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
