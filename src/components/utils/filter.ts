import { isSameWeek } from "date-fns";

import { List, Task } from "../../graphql/generated";

// ------------------------- Common -------------------------

/** Invert predicates */
export const not = (p: boolean): boolean => !p;

// ------------------------- Task -------------------------
type TaskFilter = (task: Task) => boolean;

export const taskHasDateP: TaskFilter = (task) => !!task.start || !!task.end;

export const taskIsNotDoneP: TaskFilter = (task) => !task.done;
export const taskIsDoneP: TaskFilter = (task) => not(taskIsNotDoneP(task));

export const taskIsNotDeleted: TaskFilter = (task) => !task.deleted;

export const sameWeekTask = (task: Task, week: Date = new Date()): boolean =>
  isSameWeek(new Date(task.start as string), week, { weekStartsOn: 1 });

// ------------------------- List -------------------------

/** Apply filters to all tasks of list */
export const applyFilterOnTask = (taskFilters: TaskFilter[]) => (
  list: List
): List => {
  const filteredTasks = list.tasks.filter((t) =>
    taskFilters.every((f) => f(t))
  );
  return { ...list, tasks: filteredTasks };
};
