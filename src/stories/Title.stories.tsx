import { Title, TitleType } from "../components/Title";

import React from "react";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Title", module);
story.add("home", () => {
  return <Title type={TitleType.Lists} />;
});
