import { List, UpdateListInput } from "../../graphql/generated";

/**
 * Demux an update list function to its individual list setting update
 */
export const demuxUpdateList = (
  originalList: Omit<List, "tasks">,
  updateList: (uti: UpdateListInput) => void
): {
  setTitle: (t: string) => void;
  updateColor: (r: string | null) => void;
} => {
  const list: UpdateListInput = {
    id: originalList.id,
    title: originalList.title,
    color: originalList.color,
    order: originalList.order,
  };

  return {
    setTitle: (t: string) => updateList({ ...list, title: t }),
    updateColor: (c: string | null) => updateList({ ...list, color: c }),
  };
};
