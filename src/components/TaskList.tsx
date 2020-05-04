import { Task as TaskProps, UpdateTaskInput } from "../graphql/generated";

import { NewTask } from "./NewTask";
import React from "react";
import { Spacer } from "./Spacer";
import { Task } from "./Task";
import styled from "styled-components";

interface Props {
  tasks: TaskProps[];
  updateTask: (uti: UpdateTaskInput) => void;
  createTask: (title: string) => void;
}

/**
 * A list of Tasks
 */
export const TaskList = (props: Props) => {
  const { tasks, updateTask, createTask } = props;

  return (
    <Container>
      {tasks.map(t => (
        <Task {...t} {...demuxUpdateTask(t, updateTask)} />
      ))}
      <Spacer spacing="1" />
      <NewTask createTask={createTask} />
    </Container>
  );
};

const Container = styled.div`
  overflow-y: auto;
`;

// ------------------------- Helper Functions -------------------------
const demuxUpdateTask = (
  task: TaskProps,
  updateTask: (uti: UpdateTaskInput) => void
): {
  setDone: (d: boolean) => void;
  setStart: (d: Date | null) => void;
  setEnd: (d: Date | null) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
} => ({
  setDone: (d: boolean) => updateTask({ ...task, done: d }),
  setStart: (d: Date | null) => updateTask({ ...task, start: d }),
  setEnd: (d: Date | null) => updateTask({ ...task, end: d }),
  setIncludeTime: (it: boolean) => updateTask({ ...task, includeTime: it }),
  setTitle: (t: string) => updateTask({ ...task, title: t })
});
