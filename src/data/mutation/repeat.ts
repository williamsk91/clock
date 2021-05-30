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
  const [updateRepeatMutation] = useSetRepeatMutation();
  const updateRepeat = useCallback(
    (taskId: string, upsertRepeatInput: UpsertRepeatInput | null) => {
      updateRepeatMutation({
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
            fragmentName: "Task",
          });

          cache.writeFragment({
            id: `Task:${taskId}`,
            fragment: TaskFragmentDoc,
            fragmentName: "Task",
            data: {
              ...cachedTask,
              repeat: data?.setRepeat ?? undefined,
            },
          });
        },
      });
    },
    [updateRepeatMutation]
  );

  return updateRepeat;
};
