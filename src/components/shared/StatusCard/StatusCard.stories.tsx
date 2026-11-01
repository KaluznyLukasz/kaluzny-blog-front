import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchX } from "lucide-react";

import StatusCard from "./StatusCard";

const meta = {
  title: "shared/StatusCard",
  component: StatusCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-3xl flex-col wrap-anywhere">
        <Story />
      </div>
    ),
  ],
  args: {
    Icon: <SearchX />,
    title: "Nothing here",
    hint: "It may have been removed, or the address is wrong.",
  },
} satisfies Meta<typeof StatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    children: <button type="button">Go back</button>,
  },
};
