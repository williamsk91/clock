import React, { FC, createContext, useState } from "react";
import Cookies from "js-cookie";

import { apolloClient } from "../../data/apollo";
import { useSignOutMutation } from "../../graphql/generated";

interface User {
  signedIn: boolean;
  setSignedIn: (si: boolean) => void;
  /**
   * Sign in.
   * Currently only through Google
   */
  signIn: () => void;
  signOut: () => void;
}

export const UserContext = createContext<User>({
  signedIn: false,
  setSignedIn: () => null,
  signIn: () => null,
  signOut: () => null,
});

export const UserProvider: FC = ({ children }) => {
  const refreshToken = Cookies.get("overcast_refresh_token");
  const [signedIn, setSignedIn] = useState(!!refreshToken);

  const signIn = () =>
    (window.location.href = `${process.env.REACT_APP_GRAPHQL_SERVER_URI}/auth/google`);

  const [signOutMutation] = useSignOutMutation({
    onCompleted: () => {
      Cookies.remove("overcast_refresh_token");
      Cookies.remove("overcast_access_token");
      setSignedIn(false);
      apolloClient.clearStore();
    },
  });

  const signOut = () => {
    signOutMutation();
  };

  return (
    <UserContext.Provider value={{ signedIn, setSignedIn, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
