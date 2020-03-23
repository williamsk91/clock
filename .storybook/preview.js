import "antd/dist/antd.css";
import "../src/index.css";

import React from "react";
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { theme } from "../src/styles/theme";

addDecorator(Story => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
));
