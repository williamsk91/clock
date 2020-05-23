import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { addHours } from "date-fns";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { Task } from "../graphql/generated";

const story = storiesOf("Components|Calendar", module);

story.add("base", () => {
  const [tasks, setTasks] = useState(getTasks());
  console.log("setTasks: ", setTasks);
  return <Calendar tasks={tasks} updateTask={t => console.log("t: ", t)} />;
});

const getTasks = (): Task[] => [
  {
    id: "1",
    done: null,
    title: "Milk",
    start: new Date().toISOString(),
    end: addHours(new Date(), 3).toISOString(),
    includeTime: false,
    order: 3
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
