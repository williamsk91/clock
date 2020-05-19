import React, { useState } from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { Task } from "../graphql/generated";
import { addHours } from "date-fns";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Calendar", module);

story.add("base", () => {
  const [tasks, setTasks] = useState(getTasks());
  console.log("setTasks: ", setTasks);
  return <Calendar tasks={tasks} updateTask={t => console.log("t: ", t)} />;
});

const getTasks = (): Task[] => [
  {
    id: "1",
    done: false,
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
