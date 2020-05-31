import React from "react";

import { LoginPage } from "../Login/Login";

export default { title: "Pages / Login" };

export const base = () => (
  <LoginPage onGoogleSignIn={() => console.log("google sign in")} />
);
