import type { Meta, StoryObj } from "@storybook/react-vite";

import ReadingProgress from "./ReadingProgress";

const meta = {
  title: "blog/Article/ReadingProgress",
  component: ReadingProgress,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
          {Array.from({ length: 30 }, (_, index) => (
            <p key={index}>
              Scroll down: the bar at the top of the page fills up as you read.
            </p>
          ))}
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof ReadingProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
