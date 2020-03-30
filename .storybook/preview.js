import "antd/dist/antd.css";
import "../src/index.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { theme } from "../src/styles/theme";

addDecorator(Story => (
  <ThemeProvider theme={theme}>
    <Router>
      <Story />
    </Router>
  </ThemeProvider>
));
