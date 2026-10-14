import { Badge } from "@gi-org-pl/athena";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Reveal from "./Reveal";

const meta = {
  title: "shared/Reveal",
  component: Reveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: (
      <Badge size="big">I slide in when I scroll onto the screen</Badge>
    ),
  },
  argTypes: {
    from: {
      control: "inline-radio",
      options: ["bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Reveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromBottom: Story = {};

export const FromLeft: Story = {
  args: {
    from: "left",
  },
};

export const FromRight: Story = {
  args: {
    from: "right",
  },
};

export const WithDelay: Story = {
  args: {
    delay: 600,
  },
};
