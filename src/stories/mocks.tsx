import { addHours, setHours } from "date-fns";
import { addDays } from "date-fns/esm";

import { eventColors } from "../components/Calendar/styles";
import { Task } from "../graphql/generated";

export const getTask = (override?: Partial<Task>): Task => ({
  id: "0",
  done: null,
  title: "Daily Task",
  start: new Date().toISOString(),
  end: addHours(new Date(), 3).toISOString(),
  includeTime: true,
  color: null,
  order: 1,
  repeat: {
    freq: "daily",
    byweekday: null,
  },
  ...override,
});

export const getTasks = (): Task[] => [
  {
    id: "1",
    done: null,
    title: "All Day",
    start: new Date().toISOString(),
    end: null,
    includeTime: false,
    color: null,
    order: 1,
    repeat: null,
  },
  {
    id: "2",
    done: null,
    title: "daily",
    start: setHours(new Date(), 6).toISOString(),
    end: setHours(new Date(), 7).toISOString(),
    includeTime: true,
    color: eventColors[3],

    order: 2,
    repeat: {
      freq: "daily",
      byweekday: null,
    },
  },
  {
    id: "3",
    done: null,
    title: "today",
    start: setHours(new Date(), 8).toISOString(),
    end: setHours(new Date(), 10).toISOString(),
    includeTime: true,
    color: eventColors[0],
    order: 3,
    repeat: null,
  },
  {
    id: "4",
    done: null,
    title: "yesterday",
    start: addDays(setHours(new Date(), 8), -1).toISOString(),
    end: addDays(setHours(new Date(), 10), -1).toISOString(),
    includeTime: true,
    color: eventColors[4],
    order: 4,
    repeat: null,
  },
  {
    id: "5",
    done: null,
    title: "In 2 hrs",
    start: addHours(new Date(), 2).toISOString(),
    end: addHours(new Date(), 4).toISOString(),
    includeTime: true,
    color: eventColors[10],
    order: 5,
    repeat: null,
  },
];
