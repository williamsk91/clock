import { Task } from "../graphql/generated";

export const taskHasDateP = (task: Task): boolean => !!task.start || !!task.end;

export const taskIsNotDoneP = (task: Task): boolean => !task.done;

export const taskIsNotDeleted = (task: Task): boolean => !task.deleted;
