import React from "react";
import * as faker from "faker";

import { CompletedTasksSidebar } from "../../Home/Sidebar/CompletedTasksSidebar";
import { getRandomLists } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / CompletedTasks",
  component: CompletedTasksSidebar,
};

export const base = () => (
  <SidebarOnlyLayout>
    <CompletedTasksSidebar
      updateTask={() => null}
      lists={getRandomLists(5, {
        taskOverride: () => ({
          done: faker.date.past().toISOString(),
        }),
      })}
    />
  </SidebarOnlyLayout>
);
