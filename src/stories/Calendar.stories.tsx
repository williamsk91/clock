import React from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { RepeatDropModal } from "../components/Calendar/RepeatDropModal";
import { getTasks } from "./mocks";
import { FullPageLayout } from "./utils";

export default { title: "Components / Calendar" };

export const base = () => {
  const tasks = getTasks();
  return (
    <FullPageLayout>
      <Calendar
        tasks={tasks}
        updateTask={t => console.log("t: ", t)}
        createTask={title => console.log("title: ", title)}
      />
    </FullPageLayout>
  );
};

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
