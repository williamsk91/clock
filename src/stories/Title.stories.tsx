import React, { useState } from "react";
import { Title, TitleType } from "../components/Title";

import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Title", module);
story.add("home", () => {
  const [type, setType] = useState(TitleType.Lists);
  return <Title type={type} setType={setType} />;
});
