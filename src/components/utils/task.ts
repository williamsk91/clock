import { Task, UpdateTaskInput } from "../../graphql/generated";

/**
 * Demux an update task function to its individual task setting update
 */
export const demuxUpdateTask = (
  originalTask: Task,
  updateTask: (uti: UpdateTaskInput) => void
): {
  setDone: (d: string | null) => void;
  updateDates: (dates: [Date | null, Date | null]) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
  updateColor: (r: string | null) => void;
} => {
  const task = {
    id: originalTask.id,
    title: originalTask.title,
    done: originalTask.done,
    start: originalTask.start,
    end: originalTask.end,
    includeTime: originalTask.includeTime,
    color: originalTask.color,
    order: originalTask.order,
    repeat: originalTask.repeat
      ? {
          freq: originalTask.repeat.freq,
          byweekday: originalTask.repeat.byweekday,
        }
      : null,
  };

  return {
    setDone: (d: string | null) => updateTask({ ...task, done: d }),
    updateDates: (dates: [Date | null, Date | null]) =>
      updateTask({
        ...task,
        start: dates[0]?.toISOString() ?? null,
        end: dates[1]?.toISOString() ?? null,
      }),
    setIncludeTime: (it: boolean) => updateTask({ ...task, includeTime: it }),
    setTitle: (t: string) => updateTask({ ...task, title: t }),
    updateColor: (c: string | null) => updateTask({ ...task, color: c }),
  };
};
