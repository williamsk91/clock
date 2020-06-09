import React, { useCallback } from "react";
import { Switch, useHistory } from "react-router-dom";

import { Calendar } from "../components/Calendar";
import { PrivateRoute } from "../components/Route/PrivateRoute";
import { Sidebar } from "../components/styles/layout";
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
  useUpdateTaskMutation
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

  const [createTask] = useCreateTaskMutation({
    onCompleted: ({ createTask: { id } }) => history.push(`/task/${id}`)
  });
  const [updateTask] = useUpdateTaskMutation();
  const [taskReorder] = useTaskReorderMutation();

  const createTaskOptimistic = useCallback(
    (task: CreateTaskInput) =>
      createTask({
        variables: { createTaskInput: task },
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
                repeat: t.repeat && {
                  ...t.repeat,
                  __typename: "Repeat"
                }
              }))
            }
          });
        }
      }),
    [createTask]
  );

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
        <Switch>
          <PrivateRoute exact path="/">
            <ListSidebar
              tasks={tasks}
              createTask={title =>
                createTaskOptimistic({
                  title,
                  includeTime: false,
                  done: null,
                  start: null,
                  end: null,
                  color: null,
                  repeat: null
                })
              }
              updateTask={updateTaskOptimistic}
              taskReorder={taskReorderOptimistic}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/task/:id">
            <TaskSidebar updateTask={updateTaskOptimistic} />
          </PrivateRoute>
          <PrivateRoute exact path="/newtask">
            <NewTaskSidebar
              createTask={(title, start, end, includeTime) =>
                createTaskOptimistic({
                  title,
                  includeTime,
                  done: null,
                  start: start.toISOString(),
                  end: end.toISOString(),
                  color: null,
                  repeat: null
                })
              }
            />
          </PrivateRoute>
        </Switch>
      </Sidebar.SideBar>
      <Sidebar.Content>
        <Calendar
          tasks={tasks.filter(hasDateP)}
          updateTask={updateTaskOptimistic}
          createTask={(start, end, includeTime) =>
            history.push(`/newtask`, {
              date: {
                start,
                end,
                includeTime
              }
            })
          }
        />
      </Sidebar.Content>
    </Sidebar.Container>
  );
};

// ------------------------- Helper Functions -------------------------
const hasDateP = (task: Task): boolean => !!task.start || !!task.end;
