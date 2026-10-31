import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import PageLayout from "../../shared/PageLayout/PageLayout";
import LegalNotice from "./LegalNotice";

const meta = {
  title: "legal/LegalNotice",
  component: LegalNotice,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/legal"]}>
        <PageLayout>
          <Story />
        </PageLayout>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LegalNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
