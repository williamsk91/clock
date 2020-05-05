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
      {tasks.map((t, i) => (
        <Task key={i} {...t} updateTask={updateTask} />
      ))}
      <Spacer spacing="1" />
      <NewTask createTask={createTask} />
    </Container>
  );
};

const Container = styled.div`
  overflow-y: auto;
`;
