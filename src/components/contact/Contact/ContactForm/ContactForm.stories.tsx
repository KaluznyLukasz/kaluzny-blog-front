import type { Meta, StoryObj } from "@storybook/react-vite";

import ContactForm from "./ContactForm";

const meta = {
  title: "contact/Contact/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
