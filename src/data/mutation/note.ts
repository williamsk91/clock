import { useCallback } from "react";

import { UpsertNoteInput, useSetNoteMutation } from "../../graphql/generated";

export const useSetNote = () => {
  const [setNoteMutation] = useSetNoteMutation();
  const setNote = useCallback(
    (taskId: string, note: UpsertNoteInput | null) => {
      setNoteMutation({
        variables: {
          taskId,
          note,
        },
      });
    },
    [setNoteMutation]
  );

  return setNote;
};
