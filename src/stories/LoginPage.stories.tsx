import { LoginPage } from "../Login/Login";
import React from "react";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Pages|Login", module);

story.add("base", () => (
  <LoginPage onGoogleSignIn={() => console.log("google sign in")} />
));
