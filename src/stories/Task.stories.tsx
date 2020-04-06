import React, { useState } from "react";

import { Task } from "../components/Task";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Task", module);

story.add("base", () => {
  const [done, setDone] = useState<string | null>(null);
  const [text, setText] = useState("Chocolate");
  const [start, setStart] = useState<string | null>(new Date().toISOString());
  const [hasTime, setHasTime] = useState<boolean>(false);

  return (
    <Task
      id="taskId"
      done={done}
      setDone={setDone}
      title={text}
      setTitle={setText}
      start={start}
      setStart={setStart}
      hasTime={hasTime}
      setHasTime={setHasTime}
    />
  );
});
