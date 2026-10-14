import type { Meta, StoryObj } from "@storybook/react-vite";

import LearningRoadmap from "./LearningRoadmap";

const meta = {
  title: "about-me/LearningRoadmap",
  component: LearningRoadmap,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    steps: [
      {
        title: "Native iOS apps",
        description: "iPhone apps in Swift and SwiftUI.",
        status: "done",
      },
      {
        title: "Web front end",
        description: "React, TypeScript and Tailwind CSS.",
        status: "in-progress",
      },
      {
        title: "My first App Store release",
        description: "Publishing an app for everyone.",
        status: "next",
      },
    ],
  },
} satisfies Meta<typeof LearningRoadmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStatuses: Story = {};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        title: "Web front end",
        description: "React, TypeScript and Tailwind CSS.",
        status: "in-progress",
      },
    ],
  },
};

export const LongTitle: Story = {
  args: {
    steps: [
      {
        title:
          "Averyveryveryveryveryveryveryveryveryveryverylongstepnamethatmustwrap",
        description: "It wraps instead of overflowing.",
        status: "next",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-72 wrap-anywhere">
        <Story />
      </div>
    ),
  ],
};
