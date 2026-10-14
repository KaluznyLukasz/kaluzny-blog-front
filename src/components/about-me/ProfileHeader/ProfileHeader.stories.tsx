import type { Meta, StoryObj } from "@storybook/react-vite";

import skiathosPhoto from "../../../assets/images/skiatos.jpeg";
import ProfileHeader from "./ProfileHeader";

const meta = {
  title: "about-me/ProfileHeader",
  component: ProfileHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    name: "Łukasz Kałużny",
    role: "iOS & Android developer",
  },
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPhoto: Story = {
  args: {
    photo: skiathosPhoto,
  },
};

export const WithInitials: Story = {};

export const LongName: Story = {
  args: {
    name: "Wolfeschlegelsteinhausenbergerdorffwelchevoralternwarengewissenhaft Kałużny",
    role: "Intern developer who writes very long descriptions of what they do every day",
  },
};
