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
    skills: ["TypeScript", "React", "Tailwind CSS", "Nest.js", "PostgreSQL"],
  },
} satisfies Meta<typeof SkillList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSkill: Story = {
  args: {
    skills: ["TypeScript"],
  },
};
