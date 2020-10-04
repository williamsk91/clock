import React from "react";

import { TasksSidebar } from "../../Home/Sidebar/TasksSidebar";
import { getList, getTasks } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / Tasks",
  component: TasksSidebar,
  decorators: [
    (Story: any) => (
      <SidebarOnlyLayout>
        <Story />
      </SidebarOnlyLayout>
    ),
  ],
};

export const base = () => (
  <TasksSidebar
    list={getList()}
    tasks={getTasks()}
    createTask={() => console.log("createTask")}
    updateTask={() => console.log("updateTask")}
    taskReorder={() => console.log("taskReorder")}
  />
);

export const noTasks = () => (
  <TasksSidebar
    list={getList()}
    tasks={[]}
    createTask={() => console.log("createTask")}
    updateTask={() => console.log("updateTask")}
    taskReorder={() => console.log("taskReorder")}
  />
);
