import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import ErrorPage from "./ErrorPage";

const meta = {
  title: "shared/ErrorPage",
  component: ErrorPage,
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
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
