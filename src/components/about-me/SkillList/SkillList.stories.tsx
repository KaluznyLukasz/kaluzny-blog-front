import type { Meta, StoryObj } from "@storybook/react-vite";

import SkillList from "./SkillList";

const meta = {
  title: "about-me/SkillList",
  component: SkillList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    groups: [
      { title: "Mobile", skills: ["Swift", "SwiftUI", "Kotlin"] },
      {
        title: "Web",
        skills: ["TypeScript", "React", "Tailwind CSS", "Nest.js"],
      },
      { title: "Data & tooling", skills: ["PostgreSQL", "Git"] },
    ],
  },
} satisfies Meta<typeof SkillList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleGroup: Story = {
  args: {
    groups: [{ title: "Web", skills: ["TypeScript"] }],
  },
};
