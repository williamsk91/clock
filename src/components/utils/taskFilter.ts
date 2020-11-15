import { isSameWeek } from "date-fns";

import { Task } from "../../graphql/generated";

export const taskHasDateP = (task: Task): boolean => !!task.start || !!task.end;

export const taskIsNotDoneP = (task: Task): boolean => !task.done;

export const taskIsNotDeleted = (task: Task): boolean => !task.deleted;

export const sameWeekTask = (task: Task, week: Date = new Date()) =>
  isSameWeek(new Date(task.start as string), week);
