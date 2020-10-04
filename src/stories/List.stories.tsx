import React, { useState } from "react";

import { List } from "../components/List";
import { Mini } from "../components/styles/layout";

export default { title: "Components / List", component: List };

export const base = () => (
  <Mini.Container>
    <List
      id="listId"
      title="List"
      taskCount={5}
      onClick={() => console.log("clicked")}
    />
  </Mini.Container>
);

const EditableList = () => {
  const [title, setTitle] = useState("");
  return (
    <Mini.Container>
      <List
        id="listId"
        title={title}
        onTitleEdit={(t) => setTitle(t)}
        taskCount={5}
        onClick={() => console.log("clicked")}
      />
    </Mini.Container>
  );
};

export const editableList = () => <EditableList />;
