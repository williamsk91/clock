import {
  TasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "../graphql/generated";

import React from "react";
import { TaskList } from "../components/TaskList";
import styled from "styled-components";

interface Props {
  tasks: TasksQuery["tasks"];
}

/**
 * Displays a list of task and a weekly calendar
 */
export const HomePage = (props: Props) => {
  const { tasks } = props;

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  return (
    <Container>
      <SideBar>
        <TaskList
          tasks={tasks}
          createTask={title =>
            createTask({
              variables: { title }
            })
          }
          updateTask={updateTaskInput =>
            updateTask({
              variables: {
                task: updateTaskInput
              }
            })
          }
        />
      </SideBar>
      <Content />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 365px 1fr;
`;

const SideBar = styled.div`
  background: #f7f8f7;
`;

const Content = styled.div`
  background: white;
`;
