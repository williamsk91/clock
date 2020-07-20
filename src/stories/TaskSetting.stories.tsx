import React, { useState } from "react";
import styled from "styled-components";

import { DatePicker } from "../components/DatePicker";
import { Mini } from "../components/styles/layout";
import { TaskSetting } from "../components/TaskSetting";
import { getTask } from "./mocks";
import { SidebarOnlyLayout } from "./utils";

export default {
  title: "Components / Sidebar / TaskSetting",
  component: TaskSetting,
};

const Base = () => {
  const [task, setTask] = useState(
    getTask({ repeat: { freq: "weekly", byweekday: [0, 2, 3] } })
  );
  return (
    <TaskSetting
      task={task}
      updateTask={(uti) => {
        setTask(uti);
      }}
      goBack={() => console.log("go back")}
    />
  );
};

export const base = () => (
  <SidebarOnlyLayout>
    <Container>
      <Base />
    </Container>
  </SidebarOnlyLayout>
);

const Container = styled.div`
  height: 100%;
  overflow: hidden auto;

  display: flex;
  align-items: center;
`;

const DatePickerStory = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <DatePicker
      value={[start, end]}
      onChange={([start, end]) => {
        setStart(start);
        setEnd(end);
      }}
      includeTime={true}
    />
  );
};

export const datePicker = () => (
  <Mini.Container>
    <DatePickerStory />
  </Mini.Container>
);
