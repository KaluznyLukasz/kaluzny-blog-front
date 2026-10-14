import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import PageHeader from "../PageHeader/PageHeader";
import ZigZagSection from "../ZigZagSection/ZigZagSection";
import PageLayout from "./PageLayout";

const meta = {
  title: "shared/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <PageHeader title="Page title" description="A short description." />
        <ZigZagSection title="First section" side="right">
          <p>Some content.</p>
        </ZigZagSection>
        <ZigZagSection title="Second section" side="left">
          <p>More content.</p>
        </ZigZagSection>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
