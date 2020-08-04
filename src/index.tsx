import "antd/dist/antd.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";

import "./index.css";

import App from "./App";
import { UserProvider } from "./components/context/UserContext";
import { theme } from "./components/styles/theme";
import { apolloClient } from "./data/apollo";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
