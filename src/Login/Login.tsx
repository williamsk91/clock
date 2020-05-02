import { Layout } from "../styles/layout";
import React from "react";
import { Spacer } from "../components/Spacer";
import loginImg from "../assets/login_undraw_navigator_a479.svg";
import styled from "styled-components";

/**
 * Login route is used to authenticate a user
 */
export const LoginRoute = () => {
  return (
    <LoginPage
      onGoogleSignIn={() =>
        (window.location.href = `${process.env.REACT_APP_GRAPHQL_SERVER_URI}/auth/google`)
      }
    />
  );
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
    <Layout>
      <Container>
        <Illustration src={loginImg} />
        <Spacer spacing="12" />
        <button onClick={onGoogleSignIn}>Login with Google</button>
        {/* <Text.Title onClick={onGoogleSignIn}>Login | Google</Text.Title> */}
      </Container>
    </Layout>
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
