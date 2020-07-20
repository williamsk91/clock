import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";

import notFoundImg from "../../assets/undraw_Taken_if77.svg";
import { routes } from "../route";
import { Spacer } from "../Spacer";
import { Text } from "../Text";

export const Error = () => {
  const history = useHistory();
  return (
    <Container>
      <NotFoundImg src={notFoundImg} />
      <Spacer spacing="12" />
      <Text.Title>Page not found</Text.Title>
      <Spacer spacing="12" />
      <Button type="primary" onClick={() => history.push(routes.home.index)}>
        go back home
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 0 45px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NotFoundImg = styled.img`
  max-width: 300px;
`;
