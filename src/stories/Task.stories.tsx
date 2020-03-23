import React, { useState } from "react";

import { Task } from "../components/Task";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Task", module);

story.add("base", () => {
  const [done, setDone] = useState(false);
  const [text, setText] = useState("Chocolate");
  return <Task done={done} setDone={setDone} text={text} setText={setText} />;
});

story.add("list", () => {
  const [tasks, setTasks] = useState([
    { text: "Chocolate", done: false },
    { text: "Banana", done: false },
    { text: "Bread", done: false },
    { text: "Soap", done: false },
    { text: "Eggs", done: false }
  ]);
  return (
    <>
      {tasks.map((t, i) => (
        <Task
          key={i}
          {...t}
          setDone={d => {
            const newTasks = [...tasks];
            newTasks[i].done = d;
            setTasks(newTasks);
          }}
          setText={t => {
            const newTasks = [...tasks];
            newTasks[i].text = t;
            setTasks(newTasks);
          }}
        ></Task>
      ))}
    </>
  );
});
