import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import styled from "styled-components";

import { Calendar } from "../components/Calendar";
import { Spacer } from "../components/Spacer";
import { Sidebar } from "../components/styles/layout";
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
            ...updateTaskInput,
            repeat: updateTaskInput.repeat
              ? {
                  __typename: "Repeat",
                  ...updateTaskInput.repeat
                }
              : null
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

  return (
    <Sidebar.Container>
      <Sidebar.SideBar>
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
          tasks={tasks.filter(isNotDoneP)}
          createTask={title =>
            createTask({
              variables: { title },
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
                    tasks: newTasks.map(t => ({
                      ...t,
                      repeat: t.repeat && { ...t.repeat, __typename: "Repeat" }
                    }))
                  }
                });
              }
            })
          }
          updateTask={updateTaskOptimistic}
          taskReorder={taskReorderOptimistic}
        />
      </Sidebar.SideBar>
      <Sidebar.Content>
        <Calendar
          tasks={tasks.filter(hasDateP).filter(isNotDoneP)}
          updateTask={updateTaskOptimistic}
        />
      </Sidebar.Content>
    </Sidebar.Container>
  );
};

/**
 * Displays today as big heading
 */
const Today = () => {
  return (
    <>
      <TodayContainer>{format(new Date(), "dd")}</TodayContainer>
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
