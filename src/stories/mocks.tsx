import { addHours, setHours } from "date-fns";
import { addDays } from "date-fns/esm";

import { eventColors } from "../components/Calendar/styles";
import { List, Task } from "../graphql/generated";

// ------------------------- List -------------------------

export const getList = (): List => ({
  id: "listId0",
  title: "list title",
  color: null,
  order: 0,
  tasks: getTasks(),
});

export const getLists = (): List[] => [
  {
    id: "listId1",
    title: "Work",
    color: null,
    order: 1,
    tasks: [getTask()],
  },
  {
    id: "listId2",
    title: "Groceries",
    color: eventColors.red,
    order: 2,
    tasks: [],
  },
  {
    id: "listId3",
    title: "Family",
    color: eventColors.cyan,
    order: 3,
    tasks: getTasks(),
  },
];

// ------------------------- Task -------------------------

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
    color: eventColors.red,

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
    color: eventColors.magenta,
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
    color: eventColors.lime,
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
    color: eventColors.black,
    order: 5,
    repeat: null,
  },
];
