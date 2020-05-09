import React, { useCallback } from "react";
import {
  Task,
  TasksDocument,
  TasksQuery,
  UpdateTaskInput,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "../graphql/generated";

import { Calendar } from "../components/Calendar";
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

  const updateTaskOptimistic = useCallback(
    (updateTaskInput: UpdateTaskInput) => {
      updateTask({
        variables: {
          task: updateTaskInput
        },
        optimisticResponse: {
          updateTask: {
            __typename: "Task",
            ...updateTaskInput
          }
        }
      });
    },
    [updateTask]
  );

  return (
    <Container>
      <SideBar>
        <TaskList
          tasks={tasks.filter(isNotDoneP)}
          createTask={title =>
            createTask({
              variables: { title },
              optimisticResponse: {
                createTask: {
                  __typename: "Task",
                  id: "temporaryId",
                  title,
                  done: false,
                  start: null,
                  end: null,
                  includeTime: false
                }
              },
              update: (cache, { data }) => {
                const cachedData = cache.readQuery<TasksQuery>({
                  query: TasksDocument
                });
                const newTaskData = data?.createTask;
                if (!cachedData || !newTaskData) return;

                const newTasks = [...cachedData.tasks, newTaskData];
                cache.writeQuery<TasksQuery>({
                  query: TasksDocument,
                  data: {
                    tasks: newTasks
                  }
                });
              }
            })
          }
          updateTask={updateTaskOptimistic}
        />
      </SideBar>
      <Content>
        <Calendar
          tasks={tasks.filter(hasDateP).filter(isNotDoneP)}
          updateTask={updateTaskOptimistic}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 365px 1fr;
`;

const SideBar = styled.div`
  padding: 24px;
  box-sizing: border-box;
  overflow-y: auto;

  background: #f7f8f7;
`;

const Content = styled.div`
  margin: 24px 48px;
  overflow: hidden;

  background: white;
`;

// ------------------------- Helper Functions -------------------------
const hasDateP = (task: Task): boolean => !!task.start || !!task.end;
const isNotDoneP = (task: Task): boolean => !task.done;
