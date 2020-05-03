import React, { useState } from "react";

import { Task } from "../components/Task";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Task", module);

story.add("base", () => {
  const [done, setDone] = useState(false);
  const [text, setText] = useState("Chocolate");
  const [start, setStart] = useState<Date | null>(
    new Date("2020-04-16T10:00:00Z")
  );
  const [end, setEnd] = useState<Date | null>(null);
  const [includeTime, setIncludeTime] = useState<boolean>(true);

  return (
    <Task
      id="taskId"
      done={done}
      setDone={setDone}
      title={text}
      setTitle={setText}
      start={start}
      setStart={setStart}
      end={end}
      setEnd={setEnd}
      includeTime={includeTime}
      setIncludeTime={setIncludeTime}
    />
  );
});
