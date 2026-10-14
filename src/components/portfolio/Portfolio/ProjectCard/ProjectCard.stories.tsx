import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectCard from "./ProjectCard";

const meta = {
  title: "portfolio/Portfolio/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    name: "ZSTiO",
    description:
      "The official app of my school, built together with a friend and available on the App Store and Google Play.",
    links: [
      {
        kind: "app-store",
        href: "https://apps.apple.com/pl/app/zstio/id6742645790",
      },
      {
        kind: "google-play",
        href: "https://play.google.com/store/apps/details?id=net.ZSTiO",
      },
    ],
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBothStores: Story = {};

export const WithAppStoreOnly: Story = {
  args: {
    links: [
      {
        kind: "app-store",
        href: "https://apps.apple.com/pl/app/zstio/id6742645790",
      },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    name: "Neighborly",
    description:
      "Ask your neighbours for a hand, or lend one. I'm still working on it.",
    links: undefined,
  },
};

export const LongDescription: Story = {
  args: {
    description:
      "Averyveryveryveryveryveryveryveryveryveryveryveryveryverylongwordthatmustwrap and a description that goes on for a while to show how the card handles more text.",
  },
  decorators: [
    (Story) => (
      <div className="w-72 wrap-anywhere">
        <Story />
      </div>
    ),
  ],
};
