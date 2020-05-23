import React from "react";
import { storiesOf } from "@storybook/react";

import { NewTask } from "../components/NewTask";

const story = storiesOf("Components | NewTask", module);

story.add("base", () => {
  return <NewTask createTask={title => console.log("title: ", title)} />;
});
