import React from "react";

import { Mini } from "../components/styles/layout";
import { Task } from "../components/Task";
import { getTask } from "./mocks";

export default { title: "Components / Task" };

export const base = () => (
  <Mini.Container>
    <Task
      {...getTask()}
      updateTask={(t) => console.log("update task: ", t)}
      goTask={(id) => console.log("goTask: ", id)}
    />
  </Mini.Container>
);

export const checked = () => (
  <Mini.Container>
    <Task
      {...getTask({ done: new Date().toISOString() })}
      updateTask={(t) => console.log("update task: ", t)}
      goTask={(id) => console.log("goTask: ", id)}
    />
  </Mini.Container>
);
