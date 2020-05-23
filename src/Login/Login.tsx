import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import Cookies from "js-cookie";
import styled from "styled-components";

import loginImg from "../assets/login_undraw_navigator_a479.svg";
import { UserContext } from "../components/context/UserContext";
import { MiniLayout } from "../components/styles/layout";

/**
 * Login route is used to authenticate a user
 */
export const LoginRoute = () => {
  const { signedIn, setSignedIn, signIn } = useContext(UserContext);
  const history = useHistory();

  // update signed in state if already signed in
  if (!signedIn) {
    const refreshTokenExists = !!Cookies.get("T2_refresh_token");
    refreshTokenExists && setSignedIn(refreshTokenExists);
  }

  if (signedIn) history.replace("/");

  return <LoginPage onGoogleSignIn={signIn} />;
};

interface Props {
  onGoogleSignIn: () => void;
}

/**
 * A login page with a simple illustration and sign in with google text
 */
export const LoginPage = (props: Props) => {
  const { onGoogleSignIn } = props;
  return (
    <MiniLayout>
      <Container>
        <Illustration src={loginImg} />
        <Divider />
        <Button type="primary" onClick={onGoogleSignIn}>
          Login with Google
        </Button>
      </Container>
    </MiniLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Illustration = styled.img`
  width: 100%;

  padding: 0 46px;
  box-sizing: border-box;
`;
