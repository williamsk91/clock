import React from "react";

import { ListSidebar } from "../../Home/Sidebar/ListSidebar";
import { getList } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / List",
  component: ListSidebar,
  decorators: [
    (Story: any) => (
      <SidebarOnlyLayout>
        <Story />
      </SidebarOnlyLayout>
    ),
  ],
};

export const base = () => (
  <ListSidebar
    list={getList()}
    createTask={() => console.log("createTask")}
    updateTask={() => console.log("updateTask")}
    taskReorder={() => console.log("taskReorder")}
    onClickListSetting={() => console.log("onClickListSetting")}
    onClickTaskSetting={() => console.log("onClickTaskSetting")}
  />
);

export const noTasks = () => (
  <ListSidebar
    list={getList()}
    createTask={() => console.log("createTask")}
    updateTask={() => console.log("updateTask")}
    taskReorder={() => console.log("taskReorder")}
    onClickListSetting={() => console.log("onClickListSetting")}
    onClickTaskSetting={() => console.log("onClickTaskSetting")}
  />
);
