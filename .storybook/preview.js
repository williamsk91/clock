import "antd/dist/antd.css";
import "../src/index.css";

import { addDecorator, addParameters } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "../src/styles/theme";

addDecorator(Story => (
  <ThemeProvider theme={theme}>
    <Router>
      <Container>
        <Story />
      </Container>
    </Router>
  </ThemeProvider>
));

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  padding: 12px;

  background: #f7f8f7;
`;
