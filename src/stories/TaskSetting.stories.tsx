import React, { useState } from "react";

import { TaskSetting } from "../components/TaskSetting";
import { getTask } from "./mocks";
import { SidebarOnlyLayout } from "./utils";

export default { title: "Components / TaskSetting", component: TaskSetting };

const Base = () => {
  const [task, setTask] = useState(
    getTask({ repeat: { freq: "weekly", byweekday: [0, 2, 3] } })
  );
  return (
    <TaskSetting
      task={task}
      updateTask={uti => {
        setTask(uti);
      }}
      goBack={() => console.log("go back")}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
