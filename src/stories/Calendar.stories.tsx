import { Calendar } from "../components/Calendar";
import { ITask } from "../components/types";
import React from "react";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components|Calendar", module);

story.add("base", () => {
  return <Calendar tasks={getTasks()} />;
});

const getTasks = (): ITask[] => [
  { id: "1", done: false, title: "Milk", start: new Date() }
];
