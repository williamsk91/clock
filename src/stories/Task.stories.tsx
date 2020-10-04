import React from "react";

import { Mini } from "../components/styles/layout";
import { Task } from "../components/Task";
import { getTask } from "./mocks";

export default {
  title: "Components / Task",
};

export const base = () => (
  <Mini.Container>
    <Task
      listId="listId"
      {...getTask()}
      updateTask={(t) => console.log("update task: ", t)}
      onClickTask={(id) => console.log("goTask: ", id)}
    />
  </Mini.Container>
);

export const checked = () => (
  <Mini.Container>
    <Task
      listId="listId"
      {...getTask({ done: new Date().toISOString() })}
      updateTask={(t) => console.log("update task: ", t)}
      onClickTask={(id) => console.log("goTask: ", id)}
    />
  </Mini.Container>
);

export const colored = () => (
  <Mini.Container>
    <Task
      listId="listId"
      listColor="#FF4D4F"
      {...getTask({ done: new Date().toISOString() })}
      color="#50D989"
      updateTask={(t) => console.log("update task: ", t)}
      onClickTask={(id) => console.log("goTask: ", id)}
    />
  </Mini.Container>
);
