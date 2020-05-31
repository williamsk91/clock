import { addHours } from "date-fns";

import { Task } from "../graphql/generated";

export const getTask = (override?: Partial<Task>): Task => ({
  id: "0",
  done: null,
  title: "Daily Task",
  start: new Date().toISOString(),
  end: addHours(new Date(), 3).toISOString(),
  includeTime: true,
  order: 1,
  repeat: {
    freq: "daily",
    byweekday: null
  },
  ...override
});

export const getTasks = (): Task[] => [
  {
    id: "1",
    done: null,
    title: "All Day Task",
    start: new Date().toISOString(),
    end: addHours(new Date(), 3).toISOString(),
    includeTime: false,
    order: 3,
    repeat: null
  },
  {
    id: "2",
    done: null,
    title: "Milk",
    start: new Date().toISOString(),
    end: addHours(new Date(), 3).toISOString(),
    includeTime: true,
    order: 4,
    repeat: {
      freq: "daily",
      byweekday: null
    }
  }
];
