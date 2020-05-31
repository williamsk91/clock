import React from "react";

import { Task } from "../components/Task";
import { getTask } from "./mocks";

export default { title: "Components / Task" };

export const base = () => (
  <Task {...getTask()} updateTask={t => console.log("update task: ", t)} />
);

export const checked = () => (
  <Task
    {...getTask({ done: new Date().toISOString() })}
    updateTask={t => console.log("update task: ", t)}
  />
);
