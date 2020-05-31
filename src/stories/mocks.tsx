import { addHours, setHours } from "date-fns";

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
    title: "All Day",
    start: new Date().toISOString(),
    end: null,
    includeTime: false,
    order: 1,
    repeat: null
  },
  {
    id: "2",
    done: null,
    title: "daily",
    start: setHours(new Date(), 6).toISOString(),
    end: setHours(new Date(), 7).toISOString(),
    includeTime: true,
    order: 2,
    repeat: {
      freq: "daily",
      byweekday: null
    }
  },
  {
    id: "3",
    done: null,
    title: "today",
    start: setHours(new Date(), 8).toISOString(),
    end: setHours(new Date(), 10).toISOString(),
    includeTime: true,
    order: 3,
    repeat: null
  }
];
