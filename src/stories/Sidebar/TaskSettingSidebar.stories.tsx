import React, { useState } from "react";

import { TaskSettingSidebar } from "../../Home/Sidebar/TaskSettingSidebar";
import { getList, getLists, getTask } from "../mocks";
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
      availableLists={getLists()}
      task={task}
      updateTask={(uti) => setTask({ ...uti, deleted: null })}
      updateTaskList={() => null}
      deleteTask={() => console.log("delete task")}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
