import React from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { getTasks } from "./mocks";
import { FullPageLayout } from "./utils";

export default { title: "Components / Calendar" };

export const base = () => {
  const tasks = getTasks();
  return (
    <FullPageLayout>
      <Calendar
        tasks={tasks}
        updateTask={(t) => console.log("t: ", t)}
        createTask={(title) => console.log("title: ", title)}
      />
    </FullPageLayout>
  );
};
