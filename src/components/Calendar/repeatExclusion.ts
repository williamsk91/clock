import format from "date-fns/format";

import { Task } from "../../graphql/generated";
import { setTime } from "../datetime";

export const parseTaskExdates = (task: Task): string[] => {
  const start = task.start;
  if (!task.repeat?.exclude || !start) return [];

  const startTime = new Date(start);

  return task.repeat.exclude.map((ex) => {
    const exDate = new Date(ex);
    // format is used as a hack over timezoning
    return format(setTime(exDate, startTime), "yyyy-MM-dd HH:mm:ss");
  });
};
