import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { getTasks } from "./mocks";

const story = storiesOf("Components|Calendar", module);

story.add("base", () => {
  const [tasks, setTasks] = useState(getTasks());
  console.log("setTasks: ", setTasks);
  return <Calendar tasks={tasks} updateTask={t => console.log("t: ", t)} />;
});

story.add("navigation", () => (
  <Navigation
    date={new Date()}
    onPrev={() => console.log("onPrev")}
    onNext={() => console.log("onNext")}
    onNow={() => console.log("onNow")}
  />
));
