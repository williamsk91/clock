import React from "react";
import { TaskList } from "../components/TaskList";
import { Task as TaskProps } from "../graphql/generated";
import { addHours } from "date-fns";
import { storiesOf } from "@storybook/react";
import { useState } from "react";

const story = storiesOf("Components|TaskList", module);

story.add("base", () => {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: "task1Id",
      title: "Go grocery shopping",
      done: false,
      start: new Date(),
      end: null,
      includeTime: true
    },
    {
      id: "task2Id",
      title: "Plan exercise routine",
      done: false,
      start: null,
      end: null,
      includeTime: true
    },
    {
      id: "task3Id",
      title: "Meeting with HR",
      done: false,
      start: new Date(),
      end: addHours(new Date(), 3),
      includeTime: true
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
            start: new Date(),
            end: null,
            includeTime: true
          }
        ];
        setTasks(newTasks);
      }}
    />
  );
});
