import { ListPage } from "./ListPage";
import React from "react";

export const ListRoute = () => {
  return (
    <ListPage
      name="Groceries"
      tasks={[
        {
          id: "0",
          done: false,
          title: "banana"
        }
      ]}
      updateTask={(id, tasks) => {
        console.log("id: ", id);
        console.log("tasks: ", tasks);
      }}
    />
  );
};
