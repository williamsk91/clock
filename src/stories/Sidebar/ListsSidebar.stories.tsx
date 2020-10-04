import React from "react";

import { ListsSidebar } from "../../Home/Sidebar/ListsSidebar";
import { getLists } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / Lists",
  component: ListsSidebar,

  decorators: [
    (Story: any) => (
      <SidebarOnlyLayout>
        <Story />
      </SidebarOnlyLayout>
    ),
  ],
};

export const base = () => (
  <ListsSidebar
    lists={getLists()}
    createList={() => console.log("createList")}
  />
);
