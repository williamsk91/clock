import React from "react";

import { NewTask } from "../components/NewTask";
import { Mini } from "../components/styles/layout";

export default { title: "Components / NewTask" };

export const base = () => (
  <Mini.Container>
    <NewTask createTask={(title) => console.log("title: ", title)} />
  </Mini.Container>
);
