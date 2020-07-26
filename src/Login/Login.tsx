import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import Cookies from "js-cookie";

import loginImg from "../assets/login_undraw_navigator_a479.svg";
import { UserContext } from "../components/context/UserContext";
import { routes } from "../components/route";
import { Mini } from "../components/styles/layout";

/**
 * Login route is used to authenticate a user
 */
export const LoginRoute = () => {
  const { signedIn, setSignedIn, signIn } = useContext(UserContext);
  const history = useHistory();

  // update signed in state if already signed in
  if (!signedIn) {
    const refreshTokenExists = !!Cookies.get("overcast_refresh_token");
    refreshTokenExists && setSignedIn(refreshTokenExists);
  }

  if (signedIn) history.replace(routes.home.index);

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
    <Mini.Container>
      <Mini.Illustration src={loginImg} />
      <Divider />
      <Button type="primary" onClick={onGoogleSignIn}>
        Login with Google
      </Button>
    </Mini.Container>
  );
};
