import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeXml } from "lucide-react";

import meteoraPhoto from "../../../../assets/images/meteora.jpg";
import neighborlyIcon from "../../../../assets/images/neighborly-icon.png";
import SectionImage from "./SectionImage";

const meta = {
  title: "shared/ZigZagSection/SectionImage",
  component: SectionImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const WithImage: Story = {
  args: {
    image: {
      src: meteoraPhoto,
      alt: "Me standing on a rock at Meteora in Greece",
    },
  },
};

export const WithAppIcon: Story = {
  args: {
    image: {
      src: neighborlyIcon,
      alt: "Neighborly app icon",
      isAppIcon: true,
    },
  },
};

export const WithIcon: Story = {
  args: {
    Icon: <CodeXml />,
  },
};
