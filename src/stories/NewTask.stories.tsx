import React from "react";

import { NewTask } from "../components/NewTask";

export default { title: "Components / NewTask" };

export const base = () => (
  <NewTask createTask={title => console.log("title: ", title)} />
);
