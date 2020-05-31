import React from "react";

import { Calendar } from "../components/Calendar/Calendar";
import { Navigation } from "../components/Calendar/Navigation";
import { getTasks } from "./mocks";

export default { title: "Components / Calendar" };

export const base = () => {
  const tasks = getTasks();
  return <Calendar tasks={tasks} updateTask={t => console.log("t: ", t)} />;
};

export const navigation = () => (
  <Navigation
    date={new Date()}
    onPrev={() => console.log("onPrev")}
    onNext={() => console.log("onNext")}
    onNow={() => console.log("onNow")}
  />
);
