import "antd/dist/antd.css";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { addDecorator, addParameters } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";

import "../src/index.css";

import { theme } from "../src/components/styles/theme";

addParameters({
  options: {
    showRoots: true
  }
});

addDecorator(Story => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Story />
        </Container>
      </Router>
    </ThemeProvider>
  );
});

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background: #f7f8f7;
`;
