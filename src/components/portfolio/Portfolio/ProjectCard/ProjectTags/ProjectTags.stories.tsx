import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectTags from "./ProjectTags";

const meta = {
  title: "portfolio/Portfolio/ProjectCard/ProjectTags",
  component: ProjectTags,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    tags: ["iOS", "SwiftUI", "Firebase", "Widgets"],
  },
} satisfies Meta<typeof ProjectTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleTag: Story = {
  args: {
    tags: ["iOS"],
  },
};
