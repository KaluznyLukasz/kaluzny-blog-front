import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPin, Rocket } from "lucide-react";

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

export const Full: Story = {
  args: {
    photo: skiathosPhoto,
    tagline:
      "I build iOS and Android apps that turn everyday problems into something simple and enjoyable to use.",
    facts: [
      { Icon: MapPin, label: "Based in Poland" },
      { Icon: Rocket, label: "Learning Android with Kotlin" },
    ],
    children: <button type="button">Get in touch</button>,
  },
};

export const LongName: Story = {
  args: {
    name: "Wolfeschlegelsteinhausenbergerdorffwelchevoralternwarengewissenhaft Kałużny",
    role: "Intern developer who writes very long descriptions of what they do every day",
  },
};
