import React, { useState } from "react";

import { Calendar } from "../components/Calendar";
import { ITask } from "../components/types";
import { addHours } from "date-fns";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Calendar", module);

story.add("base", () => {
  const [tasks, setTasks] = useState(getTasks());

  return (
    <Calendar
      tasks={tasks}
      setStart={(id, start) => {
        console.log("start: ", start);
        const newTasks = tasks.map(t =>
          t.id === id ? { ...t, start: start ? new Date(start) : undefined } : t
        );
        setTasks(newTasks);
      }}
      setEnd={(id, end) => {
        console.log("end: ", end);
        const newTasks = tasks.map(t =>
          t.id === id ? { ...t, end: end ? new Date(end) : undefined } : t
        );
        setTasks(newTasks);
      }}
    />
  );
});

const getTasks = (): ITask[] => [
  {
    id: "1",
    done: false,
    title: "Milk",
    start: new Date(),
    end: addHours(new Date(), 3)
  }
];
