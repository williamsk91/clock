import React, { useState } from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { Task } from "../graphql/generated";
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
          t.id === id ? { ...t, start: start ? new Date(start) : null } : t
        );
        setTasks(newTasks);
      }}
      setEnd={(id, end) => {
        console.log("end: ", end);
        const newTasks = tasks.map(t =>
          t.id === id ? { ...t, end: end ? new Date(end) : null } : t
        );
        setTasks(newTasks);
      }}
    />
  );
});

const getTasks = (): Task[] => [
  {
    id: "1",
    done: false,
    title: "Milk",
    start: new Date(),
    end: addHours(new Date(), 3),
    includeTime: false
  }
];

story.add("navigation", () => (
  <Navigation
    date={new Date()}
    onPrev={() => console.log("onPrev")}
    onNext={() => console.log("onNext")}
    onNow={() => console.log("onNow")}
  />
));
