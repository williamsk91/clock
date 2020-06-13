import React, { useState } from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { RepeatDropModal } from "../components/Calendar/RepeatDropModal";
import { getTasks } from "./mocks";
import { FullPageLayout } from "./utils";

export default { title: "Components / Calendar" };

const Base = () => {
  const [tasks, setTasks] = useState(getTasks());
  return (
    <Calendar
      tasks={tasks}
      updateTask={ut => {
        const taskIndex = tasks.findIndex(t => t.id === ut.id);
        const copy = [...tasks];
        copy[taskIndex] = ut;
        setTasks(copy);
      }}
      createTask={title => console.log("title: ", title)}
    />
  );
};
export const base = () => (
  <FullPageLayout>
    <Base />
  </FullPageLayout>
);

export const navigation = () => (
  <Navigation
    date={new Date()}
    onPrev={() => console.log("onPrev")}
    onNext={() => console.log("onNext")}
    onNow={() => console.log("onNow")}
  />
);

export const repeatDropModal = () => (
  <RepeatDropModal
    open={true}
    onCancel={() => console.log("cancel")}
    updateCurrent={() => console.log("updateCurrent")}
    updateCurrentOnward={() => console.log("updateCurrentOnward")}
    updateAll={() => console.log("updateAll")}
  />
);
