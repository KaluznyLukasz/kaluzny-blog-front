import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import NotFound from "./NotFound";

const meta = {
  title: "shared/NotFound",
  component: NotFound,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="mx-auto flex max-w-3xl flex-col wrap-anywhere">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
