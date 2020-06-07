import React from "react";

import { MiniLayout } from "../components/styles/layout";
import { Task } from "../components/Task";
import { getTask } from "./mocks";

export default { title: "Components / Task" };

export const base = () => (
  <MiniLayout>
    <Task
      {...getTask()}
      updateTask={t => console.log("update task: ", t)}
      goTask={id => console.log("goTask: ", id)}
    />
  </MiniLayout>
);

export const checked = () => (
  <MiniLayout>
    <Task
      {...getTask({ done: new Date().toISOString() })}
      updateTask={t => console.log("update task: ", t)}
      goTask={id => console.log("goTask: ", id)}
    />
  </MiniLayout>
);
