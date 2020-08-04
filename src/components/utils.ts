import { RepeatInput, Task, UpdateTaskInput } from "../graphql/generated";

/**
 * Cycles the element of the array
 */
export const cycleArray = <T>(array: T[]): T[] =>
  array.map((_, i, a) => a[i + 1 === a.length ? 0 : i + 1]);

/**
 * Demux an update task function to its individual task setting update
 */
export const demuxUpdateTask = (
  task: Task,
  updateTask: (uti: UpdateTaskInput) => void
): {
  setDone: (d: string | null) => void;
  updateDates: (dates: [Date | null, Date | null]) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
  updateRepeat: (r: RepeatInput | null) => void;
  updateColor: (r: string | null) => void;
} => {
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
    updateRepeat: (r: RepeatInput | null) => updateTask({ ...task, repeat: r }),
    updateColor: (c: string | null) => updateTask({ ...task, color: c }),
  };
};
