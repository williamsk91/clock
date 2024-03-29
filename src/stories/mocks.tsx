import { addHours, addWeeks, setHours } from "date-fns";
import { addDays, setMinutes } from "date-fns/esm";
import * as faker from "faker";
import { random } from "faker";

import { EventColor, eventColors } from "../components/Calendar/styles";
import { List, Repeat, RepeatFrequency, Task } from "../graphql/generated";

// ------------------------- List -------------------------

export const getList = (): List => ({
  id: "listId0",
  title: "list title",
  color: null,
  order: 0,
  tasks: getTasks(),
  deleted: null,
});

interface PartialList extends Partial<List> {
  taskOverride?: () => Partial<Task>;
}

export const getRandomLists = (
  count: number = 3,
  override?: PartialList
): List[] => [...Array(count).fill(0)].map(() => getRandomList(override));

export const getRandomList = (override?: PartialList): List => ({
  id: faker.random.uuid(),
  title: faker.random.words(2),
  color: getRandomEventColor(),
  order: faker.random.number(),
  tasks: getRandomTasks(faker.random.number(10)).map((t) =>
    override ? { ...t, ...override.taskOverride?.() } : t
  ),
  deleted: null,
  ...override,
});

export const getLists = (): List[] => [
  {
    id: "listId1",
    title: "Work",
    color: null,
    order: 1,
    tasks: [getTask()],
    deleted: null,
  },
  {
    id: "listId2",
    title: "Groceries",
    color: eventColors.red,
    order: 2,
    tasks: [],
    deleted: null,
  },
  {
    id: "listId3",
    title: "Family",
    color: eventColors.cyan,
    order: 3,
    tasks: getTasks(),
    deleted: null,
  },
  {
    id: "listId4",
    title: "Completed Tasks",
    color: eventColors.cyan,
    order: 3,
    tasks: [getTask({ done: new Date().toISOString() })],
    deleted: null,
  },
];

const taskRepeatTime = setMinutes(new Date(), 0);

export const getRepeatList = (): List => ({
  id: "list.repeat",
  title: "repeat list",
  color: null,
  order: 1,
  tasks: [
    {
      id: "task.repeat.daily",
      done: null,
      title: "daily",
      start: setHours(taskRepeatTime, 9).toISOString(),
      end: setHours(taskRepeatTime, 10).toISOString(),
      includeTime: true,
      color: "red",
      order: 1,
      repeat: getRepeatDaily(),
      note: null,
      deleted: null,
    },
    {
      id: "task.repeat.weekly",
      done: null,
      title: "weekly",
      start: setHours(taskRepeatTime, 11).toISOString(),
      end: setHours(taskRepeatTime, 12).toISOString(),
      includeTime: true,
      color: "blue",
      order: 2,
      repeat: getRepeatWeekly(),
      note: null,
      deleted: null,
    },
    {
      id: "task.repeat.monthly",
      done: null,
      title: "monthly",
      start: setHours(taskRepeatTime, 13).toISOString(),
      end: setHours(taskRepeatTime, 14).toISOString(),
      includeTime: true,
      color: "green",
      order: 3,
      repeat: getRepeatMonthly(),
      note: null,
      deleted: null,
    },
    {
      id: "task.repeat.yearly",
      done: null,
      title: "yearly",
      start: setHours(taskRepeatTime, 15).toISOString(),
      end: setHours(taskRepeatTime, 16).toISOString(),
      includeTime: true,
      color: "yellow",
      order: 4,
      repeat: getRepeatYearly(),
      note: null,
      deleted: null,
    },
  ],
  deleted: null,
});

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
  repeat: getRepeatDaily(),
  note: null,
  deleted: null,
  ...override,
});

export const getRandomTasks = (count: number = 5): Task[] =>
  [...Array(count).fill(0)].map(() => getRandomTask());

export const getRandomTask = (): Task => {
  const start = faker.date.between(
    addWeeks(new Date(), -1),
    addWeeks(new Date(), 1)
  );
  const end = addHours(start, random.number(20));
  return {
    id: faker.random.uuid(),
    done: null,
    title: faker.random.words(2),
    start: start.toISOString(),
    end: end.toISOString(),
    includeTime: faker.random.boolean(),
    color: getRandomEventColor(),
    order: 1,
    repeat: getRepeatDaily(),
    note: null,
    deleted: null,
  };
};

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
    note: null,
    deleted: null,
  },
  {
    id: "2",
    done: null,
    title: "daily",
    start: setHours(new Date(), 6).toISOString(),
    end: setHours(new Date(), 7).toISOString(),
    includeTime: true,
    color: "red",
    order: 2,
    repeat: getRepeatDaily(),
    note: null,
    deleted: null,
  },
  {
    id: "3",
    done: null,
    title: "today",
    start: setHours(new Date(), 8).toISOString(),
    end: setHours(new Date(), 10).toISOString(),
    includeTime: true,
    color: "magenta",
    order: 3,
    repeat: null,
    note: null,
    deleted: null,
  },
  {
    id: "4",
    done: null,
    title: "yesterday",
    start: addDays(setHours(new Date(), 8), -1).toISOString(),
    end: addDays(setHours(new Date(), 10), -1).toISOString(),
    includeTime: true,
    color: "lime",
    order: 4,
    repeat: null,
    note: null,
    deleted: null,
  },
  {
    id: "5",
    done: null,
    title: "In 2 hrs",
    start: addHours(new Date(), 2).toISOString(),
    end: addHours(new Date(), 4).toISOString(),
    includeTime: true,
    color: "black",
    order: 5,
    repeat: null,
    note: null,
    deleted: null,
  },
  {
    id: "6",
    done: null,
    title: "weekly",
    start: setHours(new Date(), 14).toISOString(),
    end: setHours(new Date(), 16).toISOString(),
    includeTime: true,
    color: "red",
    order: 6,
    repeat: getRepeatWeekly(),
    note: null,
    deleted: null,
  },
];

// ------------------------- Repeat -------------------------

export const getRepeatDaily = (override?: Partial<Repeat>): Repeat => ({
  id: "repeat.daily",
  freq: RepeatFrequency.Daily,
  byweekday: null,
  end: addHours(new Date(), 3).toISOString(),
  exclude: [],
  ...override,
});

export const getRepeatWeekly = (override?: Partial<Repeat>): Repeat => ({
  id: "repeat.weekly",
  freq: RepeatFrequency.Weekly,
  byweekday: ["MO", "WE", "TH", "SU"],
  end: addHours(new Date(), 3).toISOString(),
  exclude: [],
  ...override,
});

export const getRepeatMonthly = (override?: Partial<Repeat>): Repeat => ({
  id: "repeat.monthly",
  freq: RepeatFrequency.Monthly,
  byweekday: null,
  end: null,
  exclude: [],
  ...override,
});

export const getRepeatYearly = (override?: Partial<Repeat>): Repeat => ({
  id: "repeat.yearly",
  freq: RepeatFrequency.Yearly,
  byweekday: null,
  end: null,
  exclude: [],
  ...override,
});

// ------------------------- Others -------------------------

export const getRandomEventColor = (): EventColor => {
  const colors: EventColor[] = Object.keys(
    eventColors
  ) as unknown as EventColor[];
  return colors[Math.floor(Math.random() * colors.length)];
};
