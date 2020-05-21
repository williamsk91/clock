import React, { FC, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { UserContext } from "../context/UserContext";

/**
 * Routes that can only be accessed by signed in users
 */
export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { signedIn } = useContext(UserContext);

  if (!signedIn) return <Redirect to="/login" />;

  return <Route {...rest}>{children}</Route>;
};
