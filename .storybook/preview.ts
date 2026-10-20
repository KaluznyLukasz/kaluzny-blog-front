import type { Preview } from "@storybook/react-vite";
import { sb } from "storybook/test";

import "../src/index.css";

sb.mock(import("../src/services/api/client/getArticles.ts"), { spy: true });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
