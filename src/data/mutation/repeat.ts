import { useCallback } from "react";

import {
  Task,
  TaskFragmentDoc,
  UpsertRepeatInput,
  useSetRepeatMutation,
} from "../../graphql/generated";

/**
 * Update repeat
 */
export const useUpdateRepeat = () => {
  const [updateTaskMutation] = useSetRepeatMutation();
  const updateRepeat = useCallback(
    (taskId: string, upsertRepeatInput: UpsertRepeatInput | null) => {
      console.log("upsertRepeatInput: ", upsertRepeatInput);
      updateTaskMutation({
        variables: {
          taskId,
          repeat: upsertRepeatInput
            ? {
                freq: upsertRepeatInput.freq,
                end: upsertRepeatInput.end,
                byweekday: upsertRepeatInput.byweekday,
                exclude: upsertRepeatInput.exclude,
              }
            : null,
        },
        // task cache update
        update: (cache, { data }) => {
          // deletion
          if (upsertRepeatInput === null) {
            return cache.evict({ id: `Repeat:${data?.setRepeat.id}` });
          }

          const cachedTask = cache.readFragment<Task>({
            id: `Task:${taskId}`,
            fragment: TaskFragmentDoc,
          });

          cache.writeFragment({
            id: `Task:${taskId}`,
            fragment: TaskFragmentDoc,
            data: {
              ...cachedTask,
              repeat: data?.setRepeat ?? undefined,
            },
          });
        },
      });
    },
    [updateTaskMutation]
  );

  return updateRepeat;
};
