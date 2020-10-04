import "antd/dist/antd.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import "../src/index.css";

import { theme } from "../src/components/styles/theme";

export const parameters = {
  layout: "fullscreen",
};

addParameters({
  options: {
    showRoots: true,
  },
});

addDecorator((Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Story />
      </Router>
    </ThemeProvider>
  );
});
