import React from "react";
import { storiesOf } from "@storybook/react";
import { addHours } from "date-fns";

import { HomePage } from "../Home/HomePage";

const story = storiesOf("Components / HomePage", module);

story.add("base", () => {
  return (
    <HomePage
      tasks={[
        {
          id: "task1Id",
          title: "Go grocery shopping",
          done: null,
          start: new Date().toISOString(),
          end: null,
          includeTime: true,
          order: 1
        },
        {
          id: "task2Id",
          title: "Plan exercise routine",
          done: null,
          start: null,
          end: null,
          includeTime: true,
          order: 2
        },
        {
          id: "task3Id",
          title: "Meeting with HR",
          done: null,
          start: new Date().toISOString(),
          end: addHours(new Date(), 3).toISOString(),
          includeTime: true,
          order: 3
        }
      ]}
    />
  );
});
