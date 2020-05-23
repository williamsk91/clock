import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import styled from "styled-components";

import { Calendar } from "../components/Calendar";
import { Spacer } from "../components/Spacer";
import { TaskList } from "../components/TaskList";
import { cycleArray } from "../components/utils";
import {
  Task,
  TaskFragmentDoc,
  TaskReorderInput,
  TasksDocument,
  TasksQuery,
  UpdateTaskInput,
  useCreateTaskMutation,
  useTaskReorderMutation,
  useUpdateTaskMutation
} from "../graphql/generated";

interface Props {
  tasks: TasksQuery["tasks"];
}
/**
 * Displays a list of task and a weekly calendar
 */
export const HomePage = (props: Props) => {
  const { tasks } = props;
  const history = useHistory();

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [taskReorder] = useTaskReorderMutation();

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

  const taskReorderOptimistic = useCallback(
    (taskReorderInput: TaskReorderInput[]) => {
      const shiftedOrder = cycleArray(taskReorderInput);

      taskReorder({
        variables: { tasks: taskReorderInput },
        optimisticResponse: {
          taskReorder: taskReorderInput.map((t, i) => ({
            ...t,
            order: shiftedOrder[i].order,
            __typename: "TaskReorder"
          }))
        },
        update: (cache, { data }) => {
          if (!data?.taskReorder) return;
          data.taskReorder.forEach(({ id, order }) => {
            const cachedTask = cache.readFragment<Task>({
              id: `Task:${id}`,
              fragment: TaskFragmentDoc
            });
            cache.writeFragment({
              id: `Task:${id}`,
              fragment: TaskFragmentDoc,
              data: {
                ...cachedTask,
                order
              }
            });
          });
        }
      });
    },
    [taskReorder]
  );

  const displayTasks = tasks.filter(isNotDoneP);

  return (
    <Container>
      <SideBar>
        <div>
          <Spacer spacing="12" />
          <Button
            onClick={() => history.push("/setting")}
            type="default"
            icon={<SettingOutlined />}
          >
            setting
          </Button>
          <Spacer spacing="12" />
          <Today />
          <Spacer spacing="24" />
        </div>
        <TaskList
          tasks={displayTasks}
          createTask={title =>
            createTask({
              variables: { title },
              optimisticResponse: {
                createTask: {
                  __typename: "Task",
                  id: "temporaryId",
                  title,
                  done: null,
                  start: null,
                  end: null,
                  includeTime: false,
                  order: tasks[tasks.length - 1].order + 1
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
          taskReorder={taskReorderOptimistic}
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
  height: 100vh;
  padding: 0 24px;
  box-sizing: border-box;

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
