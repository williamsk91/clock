import React, { useState } from "react";

import { List } from "../components/List";
import { Mini } from "../components/styles/layout";
import { getList } from "./mocks";

export default { title: "Components / List", component: List };

export const base = () => (
  <Mini.Container>
    <List {...getList()} onClick={() => console.log("clicked")} />
  </Mini.Container>
);

const EditableList = () => {
  const [title, setTitle] = useState("");
  return (
    <Mini.Container>
      <List
        {...getList()}
        title={title}
        onTitleEdit={(t) => setTitle(t)}
        onClick={() => console.log("clicked")}
      />
    </Mini.Container>
  );
};

export const editableList = () => <EditableList />;
