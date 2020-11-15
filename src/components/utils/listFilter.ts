import { List } from "../../graphql/generated";
import { sameWeekTask } from "./taskFilter";

export const sameWeekList = (list: List, week: Date = new Date()) => ({
  ...list,
  tasks: list.tasks.filter((t) => sameWeekTask(t, week)),
});
