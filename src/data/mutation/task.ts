import { useCallback } from "react";

import { MutationHookOptions } from "@apollo/client";

import { cycleArray } from "../../components";
import {
  CreateTaskInput,
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  ListDocument,
  ListQuery,
  ListQueryVariables,
  Task,
  TaskFragmentDoc,
  TaskReorderInput,
  UpdateTaskInput,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTaskReorderMutation,
  useUpdateTaskMutation,
} from "../../graphql/generated";

/**
 * Create task mutation with cache update
 */
export const useCreateTask = () => {
  const [createTaskMutation] = useCreateTaskMutation();
  const createTask = useCallback(
    (listId: string, cti: CreateTaskInput) =>
      createTaskMutation({
        variables: {
          listId,
          createTaskInput: cti,
        },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery<ListQuery, ListQueryVariables>({
            query: ListDocument,
            variables: { listId },
          });
          const newTaskData = data?.createTask;
          if (!cachedData || !newTaskData) return;
          const newTasks = [...cachedData.list.tasks, newTaskData];
          cache.writeQuery<ListQuery, ListQueryVariables>({
            query: ListDocument,
            variables: { listId },
            data: {
              list: {
                __typename: "List",
                ...cachedData.list,
                tasks: newTasks.map((t) => ({
                  ...t,
                  repeat: t.repeat && {
                    ...t.repeat,
                    __typename: "Repeat",
                  },
                })),
              },
            },
          });
        },
      }),
    [createTaskMutation]
  );

  return createTask;
};

/**
 * Update task with optimistic update
 */
export const useUpdateTask = () => {
  const [updateTaskMutation] = useUpdateTaskMutation();
  const updateTask = useCallback(
    (updateTaskInput: UpdateTaskInput) => {
      updateTaskMutation({
        variables: {
          task: updateTaskInput,
        },
        optimisticResponse: {
          updateTask: {
            __typename: "Task",
            ...updateTaskInput,
            deleted: null,
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
    [updateTaskMutation]
  );

  return updateTask;
};

/**
 * Delete task
 */
export const useDeleteTask = (
  options?: MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>
) => {
  const [deleteTaskMutation] = useDeleteTaskMutation(options);
  const deleteTask = useCallback(
    (taskId: string) => {
      deleteTaskMutation({
        variables: {
          taskId,
        },
      });
    },
    [deleteTaskMutation]
  );

  return deleteTask;
};

/**
 * Task reorder with cache update
 */
export const useTaskReorder = () => {
  const [taskReorderMutation] = useTaskReorderMutation();
  const taskReorder = useCallback(
    (taskReorderInput: TaskReorderInput[]) => {
      const shiftedOrder = cycleArray(taskReorderInput);

      taskReorderMutation({
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
    [taskReorderMutation]
  );

  return taskReorder;
};
