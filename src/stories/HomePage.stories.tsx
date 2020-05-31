import React from "react";
import { storiesOf } from "@storybook/react";

import { HomePage } from "../Home/HomePage";
import { getTasks } from "./mocks";

const story = storiesOf("Components / HomePage", module);

story.add("base", () => {
  return <HomePage tasks={getTasks()} />;
});
