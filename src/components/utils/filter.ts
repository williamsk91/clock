import { endOfWeek, isSameWeek, startOfWeek } from "date-fns";

import { List, Task } from "../../graphql/generated";
import { repeatToRRule } from "../datetime";

// ------------------------- Common -------------------------

/** Invert predicates */
export const not = (p: boolean): boolean => !p;

// ------------------------- Task -------------------------
type TaskFilter = (task: Task) => boolean;

export const taskHasDateP: TaskFilter = (task) => !!task.start || !!task.end;

export const taskIsNotDoneP: TaskFilter = (task) => !task.done;
export const taskIsDoneP: TaskFilter = (task) => not(taskIsNotDoneP(task));

export const taskIsNotDeletedP: TaskFilter = (task) => !task.deleted;

export const sameWeekTask = (task: Task, week: Date = new Date()): boolean => {
  if (task.repeat && task.start) {
    const rrule = repeatToRRule(task.repeat, new Date(task.start));
    const today = Date.now();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const betweenDates = rrule.between(start, end);
    return betweenDates.some((d) => isSameWeek(d, week, { weekStartsOn: 1 }));
  }

  return isSameWeek(new Date(task.start as string), week, { weekStartsOn: 1 });
};

// ------------------------- List -------------------------

/**
 * Apply filters to all tasks of a list
 * Note: use it with `map` method and not `filter` method
 */
export const applyFilterOnTask = (taskFilters: TaskFilter[]) => (
  list: List
): List => {
  const filteredTasks = list.tasks.filter((t) =>
    taskFilters.every((f) => f(t))
  );
  return { ...list, tasks: filteredTasks };
};
