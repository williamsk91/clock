import React, { useState } from "react";

import { ListPage } from "../List/ListPage";
import { Task as TaskProps } from "../graphql/generatedGraphql";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Pages|List", module);
story.add("base", () => {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: "0",
      done: null,
      title: "Cereal",
      start: null,
      hasTime: false,
    },
    {
      id: "1",
      done: new Date("2020-03-25").toISOString(),
      title: "Milk",
      start: null,
      hasTime: false,
    },
    {
      id: "2",
      done: null,
      title: "Bowl",
      start: new Date("2020-09-01").toISOString(),
      hasTime: false,
    },
  ]);
  return (
    <ListPage
      title="Groceries"
      tasks={tasks}
      updateTask={(newTask) => {
        const newTasks = tasks.map((t) => {
          if (t.id === newTask.id) return newTask;
          return t;
        });

        setTasks(newTasks);
      }}
      userList={[
        { id: "1", title: "Groceries" },
        { id: "2", title: "Exercise" },
        { id: "3", title: "Work" },
      ]}
    />
  );
});
