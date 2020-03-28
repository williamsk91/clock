import React, { useState } from "react";

import { ITask } from "../components/types";
import { ListPage } from "../List/ListPage";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Pages|List", module);
story.add("base", () => {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: "0",
      done: false,
      title: "Cereal"
    },
    {
      id: "1",
      done: true,
      title: "Milk"
    },
    {
      id: "2",
      done: false,
      title: "Bowl",
      start: new Date()
    }
  ]);
  return (
    <ListPage
      name="Groceries"
      tasks={tasks}
      updateTask={(id, newTask) => {
        const newTasks = tasks.map(t => {
          if (t.id === id) return newTask;
          return t;
        });
        setTasks(newTasks);
      }}
    />
  );
});
