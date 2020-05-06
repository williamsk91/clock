import {
  Task,
  TasksDocument,
  TasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation
} from "../graphql/generated";

import { Calendar } from "../components/Calendar";
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
          updateTask={updateTaskInput =>
            updateTask({
              variables: {
                task: updateTaskInput
              }
            })
          }
        />
      </SideBar>
      <Content>
        <Calendar
          tasks={tasks.filter(hasDateP).filter(isNotDoneP)}
          setStart={start => console.log("start: ", start)}
          setEnd={end => console.log("end: ", end)}
        />
      </Content>
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
  padding: 24px;

  background: #f7f8f7;
`;

const Content = styled.div`
  padding: 24px 48px;

  background: white;
`;

// ------------------------- Helper Functions -------------------------
const hasDateP = (task: Task): boolean => !!task.start || !!task.end;
const isNotDoneP = (task: Task): boolean => !task.done;
