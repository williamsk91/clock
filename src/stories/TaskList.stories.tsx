import React from "react";
import { useState } from "react";

import { TaskList } from "../components/TaskList";
import { Task as TaskProps } from "../graphql/generated";
import { getTasks } from "./mocks";
import { SidebarOnlyLayout } from "./utils";

export default { title: "Components / TaskList" };

const Base = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(getTasks());

  return (
    <TaskList
      tasks={tasks}
      updateTask={updateTaskInput => {
        const newTasks = tasks.map(t =>
          t.id === updateTaskInput.id ? { ...t, ...updateTaskInput } : t
        );
        setTasks(newTasks);
      }}
      taskReorder={() => console.log("swap order")}
      goTask={id => console.log("goTask: ", id)}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
