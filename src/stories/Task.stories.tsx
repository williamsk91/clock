import React from "react";
import { storiesOf } from "@storybook/react";

import { Task } from "../components/Task";
import { getTask } from "./mocks";

const story = storiesOf("Components|Task", module);

story.add("base", () => (
  <Task {...getTask()} updateTask={t => console.log("update task: ", t)} />
));

story.add("checked", () => (
  <Task
    {...getTask({ done: new Date().toISOString() })}
    updateTask={t => console.log("update task: ", t)}
  />
));
