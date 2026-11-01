import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectStatusBadge from "./ProjectStatusBadge";

const meta = {
  title: "portfolio/Portfolio/ProjectCard/ProjectStatusBadge",
  component: ProjectStatusBadge,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    status: "live",
  },
} satisfies Meta<typeof ProjectStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {};

export const InProgress: Story = {
  args: {
    status: "in-progress",
  },
};
