import { HomePage } from "../Home/HomePage";
import React from "react";
import { addHours } from "date-fns";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components / HomePage", module);

story.add("base", () => {
  return (
    <HomePage
      tasks={[
        {
          id: "task1Id",
          title: "Go grocery shopping",
          done: false,
          start: new Date().toISOString(),
          end: null,
          includeTime: true
        },
        {
          id: "task2Id",
          title: "Plan exercise routine",
          done: false,
          start: null,
          end: null,
          includeTime: true
        },
        {
          id: "task3Id",
          title: "Meeting with HR",
          done: false,
          start: new Date().toISOString(),
          end: addHours(new Date(), 3).toISOString(),
          includeTime: true
        }
      ]}
    />
  );
});
