import React, { useCallback } from "react";
import { Redirect, Switch, useHistory } from "react-router-dom";

import { Calendar } from "../components/Calendar";
import { routes } from "../components/route";
import { PrivateRoute } from "../components/Route/PrivateRoute";
import { Spacer } from "../components/Spacer";
import { Sidebar } from "../components/styles/layout";
import { hasDateP, isNotDoneP } from "../components/taskFilter";
import { cycleArray } from "../components/utils";
import {
  CreateTaskInput,
  Task,
  TaskFragmentDoc,
  TaskReorderInput,
  TasksDocument,
  TasksQuery,
  UpdateTaskInput,
  useCreateTaskMutation,
  useTaskReorderMutation,
  useUpdateTaskMutation,
} from "../graphql/generated";
import { ListSidebar } from "./Sidebar/ListSidebar";
import { NewTaskSidebar } from "./Sidebar/NewTaskSidebar";
import { TaskSidebar } from "./Sidebar/TaskSidebar";

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

  const createTaskOptimistic = useCallback(
    (task: CreateTaskInput) =>
      createTask({
        variables: { createTaskInput: task },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery<TasksQuery>({
            query: TasksDocument,
          });
          const newTaskData = data?.createTask;
          if (!cachedData || !newTaskData) return;
          const newTasks = [...cachedData.tasks, newTaskData];
          cache.writeQuery<TasksQuery>({
            query: TasksDocument,
            data: {
              tasks: newTasks.map((t) => ({
                ...t,
                repeat: t.repeat && {
                  ...t.repeat,
                  __typename: "Repeat",
                },
              })),
            },
          });
          history.push(routes.home.index);
        },
      }),
    [createTask, history]
  );

  const updateTaskOptimistic = useCallback(
    (updateTaskInput: UpdateTaskInput) => {
      updateTask({
        variables: {
          task: updateTaskInput,
        },
        optimisticResponse: {
          updateTask: {
            __typename: "Task",
            ...updateTaskInput,
            repeat: updateTaskInput.repeat
              ? {
                  __typename: "Repeat",
                  ...updateTaskInput.repeat,
                }
              : null,
          },
        },
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
            __typename: "TaskReorder",
          })),
        },
        update: (cache, { data }) => {
          if (!data?.taskReorder) return;
          data.taskReorder.forEach(({ id, order }) => {
            const cachedTask = cache.readFragment<Task>({
              id: `Task:${id}`,
              fragment: TaskFragmentDoc,
            });
            cache.writeFragment({
              id: `Task:${id}`,
              fragment: TaskFragmentDoc,
              data: {
                ...cachedTask,
                order,
              },
            });
          });
        },
      });
    },
    [taskReorder]
  );

  const createCalendarTask = useCallback(
    (start: Date, end: Date, includeTime: boolean) => {
      history.push(routes.home.newTask, {
        date: {
          start,
          end,
          includeTime,
        },
      });
    },
    [history]
  );

  return (
    <Sidebar.Container>
      <Sidebar.SideBar>
        <Switch>
          <PrivateRoute exact path={routes.home.index}>
            <ListSidebar
              tasks={tasks}
              createTask={(title) =>
                createTaskOptimistic({
                  title,
                  includeTime: false,
                  done: null,
                  start: null,
                  end: null,
                  color: null,
                  repeat: null,
                })
              }
              updateTask={updateTaskOptimistic}
              taskReorder={taskReorderOptimistic}
            />
          </PrivateRoute>
          <PrivateRoute exact path={routes.home.task}>
            <TaskSidebar updateTask={updateTaskOptimistic} />
          </PrivateRoute>
          <PrivateRoute exact path={routes.home.newTask}>
            <NewTaskSidebar
              createTask={(title, start, end, includeTime) =>
                createTaskOptimistic({
                  title,
                  includeTime,
                  done: null,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  color: null,
                  repeat: null,
                })
              }
            />
          </PrivateRoute>
          <Redirect to={routes.error} />
        </Switch>
      </Sidebar.SideBar>
      <Sidebar.Content>
        <Spacer spacing="12" />
        <Calendar
          tasks={tasks.filter(hasDateP).filter(isNotDoneP)}
          updateTask={updateTaskOptimistic}
          createTask={createCalendarTask}
        />
      </Sidebar.Content>
    </Sidebar.Container>
  );
};
