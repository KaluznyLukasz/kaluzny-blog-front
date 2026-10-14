import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeXml } from "lucide-react";

import meteoraPhoto from "../../../assets/images/meteora.jpg";
import ZigZagSection from "./ZigZagSection";

const meta = {
  title: "shared/ZigZagSection",
  component: ZigZagSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "About me",
    side: "left",
    children: (
      <p>
        Hi! I'm Łukasz, a developer who loves turning everyday problems into
        apps that people enjoy using.
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex max-w-5xl flex-col p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ZigZagSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {};

export const Right: Story = {
  args: {
    side: "right",
  },
};

export const WithImage: Story = {
  args: {
    image: {
      src: meteoraPhoto,
      alt: "Me standing on a rock at Meteora in Greece",
    },
  },
};

export const WithIcon: Story = {
  args: {
    Icon: <CodeXml />,
  },
};
