import React, { useState } from "react";

import { Task } from "../components/Task";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Task", module);

story.add("base", () => {
  const [done, setDone] = useState(false);
  const [text, setText] = useState("Chocolate");
  const [start, setStart] = useState<Date | undefined>(new Date());
  return (
    <Task
      id="taskId"
      done={done}
      setDone={setDone}
      title={text}
      setTitle={setText}
      start={start}
      setStart={setStart}
    />
  );
});
