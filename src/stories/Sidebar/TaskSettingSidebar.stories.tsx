import { useState } from "react";

import { TaskSettingSidebar } from "../../Home/Sidebar/TaskSettingSidebar";
import { getList, getLists, getRepeatWeekly, getTask } from "../mocks";
import { SidebarOnlyLayout } from "../utils";

export default {
  title: "Sidebar / TaskSetting",
  component: TaskSettingSidebar,
};

const Base = () => {
  const [task, setTask] = useState(getTask({ repeat: getRepeatWeekly() }));
  return (
    <TaskSettingSidebar
      list={getList()}
      availableLists={getLists()}
      task={task}
      updateTask={(uti) => setTask({ ...task, ...uti, deleted: null })}
      updateRepeat={(upsertRepeatInput) =>
        console.log("upsertRepeatInput: ", upsertRepeatInput)
      }
      setNote={(upsertNoteInput) =>
        console.log("setNoteInput: ", upsertNoteInput)
      }
      updateTaskList={() => null}
      deleteTask={(taskId) => console.log("taskId: ", taskId)}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Base />
  </SidebarOnlyLayout>
);
