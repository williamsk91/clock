import React from "react";

import { NewTask } from "../components/NewTask";
import { MiniLayout } from "../components/styles/layout";

export default { title: "Components / NewTask" };

export const base = () => (
  <MiniLayout>
    <NewTask createTask={title => console.log("title: ", title)} />
  </MiniLayout>
);
