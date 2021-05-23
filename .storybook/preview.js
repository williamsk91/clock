import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import "../src/index.css";

import { theme } from "../src/components/styles/theme";

export const parameters = {
  layout: "fullscreen",
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#fff",
      },
      {
        name: "black",
        value: "#000",
      },
      {
        name: "sidebar",
        value: "#f7f8f7",
      },
    ],
  },
};

addParameters({
  options: {
    showRoots: true,
  },
});

/**
 * This allows hooks on export
 * @see https://github.com/storybookjs/storybook/issues/5721#issuecomment-739949349
 */
addDecorator((Story) => <Story />);

addDecorator((Story) => (
  <ThemeProvider theme={theme}>
    <Router>
      <Story />
    </Router>
  </ThemeProvider>
));
