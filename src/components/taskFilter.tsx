import { Task } from "../graphql/generated";

export const hasDateP = (task: Task): boolean => !!task.start || !!task.end;

export const isNotDoneP = (task: Task): boolean => !task.done;
