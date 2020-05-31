import React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";

import { TaskList } from "../components/TaskList";
import { Task as TaskProps } from "../graphql/generated";
import { getTasks } from "./mocks";

const story = storiesOf("Components|TaskList", module);

story.add("base", () => {
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
      createTask={title => {
        const newTasks = [
          ...tasks,
          {
            id: `${title}-id`,
            title,
            done: null,
            start: new Date().toISOString(),
            end: null,
            includeTime: true,
            order: tasks[tasks.length - 1].order + 1,
            repeat: null
          }
        ];
        setTasks(newTasks);
      }}
      taskReorder={() => console.log("swap order")}
    />
  );
});
