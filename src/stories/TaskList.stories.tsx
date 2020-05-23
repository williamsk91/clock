import React from "react";
import { useState } from "react";
import { storiesOf } from "@storybook/react";
import { addHours } from "date-fns";

import { TaskList } from "../components/TaskList";
import { Task as TaskProps } from "../graphql/generated";

const story = storiesOf("Components|TaskList", module);

story.add("base", () => {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: "task1Id",
      title: "Go grocery shopping",
      done: false,
      start: new Date().toISOString(),
      end: null,
      includeTime: true,
      order: 1
    },
    {
      id: "task2Id",
      title: "Plan exercise routine",
      done: false,
      start: null,
      end: null,
      includeTime: true,
      order: 1
    },
    {
      id: "task3Id",
      title: "Meeting with HR",
      done: false,
      start: new Date().toISOString(),
      end: addHours(new Date(), 3).toISOString(),
      includeTime: true,
      order: 1
    }
  ]);
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
            done: false,
            start: new Date().toISOString(),
            end: null,
            includeTime: true,
            order: tasks[tasks.length - 1].order + 1
          }
        ];
        setTasks(newTasks);
      }}
      taskReorder={() => console.log("swap order")}
    />
  );
});
