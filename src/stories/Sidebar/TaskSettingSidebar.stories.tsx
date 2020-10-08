import React, { useState } from "react";

import { TaskSettingSidebar } from "../../Home/Sidebar/TaskSettingSidebar";
import { getList, getTask } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / TaskSetting",
  component: TaskSettingSidebar,
};

const Base = () => {
  const [task, setTask] = useState(
    getTask({ repeat: { freq: "weekly", byweekday: [0, 2, 3] } })
  );
  return (
    <TaskSettingSidebar
      list={getList()}
      task={task}
      updateTask={(uti) => setTask(uti)}
      goBack={() => console.log("go back")}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
