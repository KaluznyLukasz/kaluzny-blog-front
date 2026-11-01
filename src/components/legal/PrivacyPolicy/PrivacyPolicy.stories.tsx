import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import PageLayout from "../../shared/PageLayout/PageLayout";
import PrivacyPolicy from "./PrivacyPolicy";

const meta = {
  title: "legal/PrivacyPolicy",
  component: PrivacyPolicy,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/privacy"]}>
        <PageLayout>
          <Story />
        </PageLayout>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PrivacyPolicy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
