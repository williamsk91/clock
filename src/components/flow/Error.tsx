import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

import notFoundImg from "../../assets/undraw_Taken_if77.svg";
import { routes } from "../route";
import { Spacer } from "../Spacer";
import { Mini } from "../styles/layout";
import { Text } from "../Text";

export const Error = () => {
  const history = useHistory();
  return (
    <Mini.Container>
      <Mini.Illustration src={notFoundImg} />
      <Spacer spacing="12" />
      <Text.Title>Page not found</Text.Title>
      <Spacer spacing="12" />
      <Button type="primary" onClick={() => history.push(routes.home.index)}>
        go back home
      </Button>
    </Mini.Container>
  );
};
