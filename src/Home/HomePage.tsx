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
import { Spacer } from "../components/Spacer";
import { TaskList } from "../components/TaskList";
import { format } from "date-fns";
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
        <Spacer spacing="48" />
        <Today />
        <Spacer spacing="48" />
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

/**
 * Displays today as big heading
 */
const Today = () => {
  return (
    <>
      <TodayContainer>{format(new Date(), "d")}</TodayContainer>
      <TodayContainer>{format(new Date(), "MMMM")}</TodayContainer>
    </>
  );
};

const TodayContainer = styled.div`
  font-size: 64px;
  color: rgba(55, 53, 47, 0.85);
  line-height: 1;
`;

// ------------------------- Helper Functions -------------------------
const hasDateP = (task: Task): boolean => !!task.start || !!task.end;
const isNotDoneP = (task: Task): boolean => !task.done;
