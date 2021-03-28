import { useCallback } from "react";

import {
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
                start: upsertRepeatInput.start,
                end: upsertRepeatInput.end,
                byweekday: upsertRepeatInput.byweekday,
                exclude: upsertRepeatInput.exclude,
              }
            : null,
        },
      });
    },
    [updateTaskMutation]
  );

  return updateRepeat;
};
