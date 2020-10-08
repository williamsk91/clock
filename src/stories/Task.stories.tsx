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
      listColor={null}
      {...getTask()}
      updateTask={(t) => console.log("update task: ", t)}
      onClickSetting={(id) => console.log("onClickSetting: ", id)}
    />
  </Mini.Container>
);

export const checked = () => (
  <Mini.Container>
    <Task
      listId="listId"
      listColor={null}
      {...getTask({ done: new Date().toISOString() })}
      updateTask={(t) => console.log("update task: ", t)}
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
    />
  </Mini.Container>
);
