import React, { useContext } from "react";

import { ListPage } from "./ListPage";
import { UserListContext } from "../components/TitleContext";

export const ListRoute = () => {
  const userList = useContext(UserListContext);

  return (
    <ListPage
      title="Groceries"
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
      userList={userList ?? []}
    />
  );
};
