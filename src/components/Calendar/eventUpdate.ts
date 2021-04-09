import { EventChangeArg } from "@fullcalendar/common";
import { addDays } from "date-fns";
import format from "date-fns/format";

import {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
  UpsertRepeatInput,
} from "../../graphql/generated";
import { setTime } from "../datetime";

interface EventChangeMutations {
  updateTask: (t: UpdateTaskInput) => void;
  updateRepeat: (taskId: string, r: UpsertRepeatInput) => void;
  createTask: (listId: string, t: CreateTaskInput) => void;
}

type EventChangeUpdate = (
  eventChange: EventChangeArg,
  mutations: EventChangeMutations
) => void;

/**
 * There are 3 main ways to update a task with repeat
 *
 *  1. Update all events
 *  2. Update events from now onwards
 *  3. Only update this event
 *
 * All these can be achieved with the following mutations
 *
 *  1. task update
 *  2. repeat update
 *  3. new task
 */
export const eventChange: EventChangeUpdate = (eventChange, mutations) => {
  repeatUpdateAll(eventChange, mutations);
};

/**
 * When updating all repeat instances
 *
 *  1. Update only time component of `start` and `end`
 *  2. Clear any `exdates`
 */
export const repeatUpdateAll: EventChangeUpdate = (eventChange, mutations) => {
  const { event } = eventChange;
  const task: Task = event.extendedProps?.task;

  if (!task.repeat?.freq) return;
  if (!task.start || !event.start) return;
  if (!task.end || !event.end) return;

  const updateTask: UpdateTaskInput = {
    ...task,
    start: setTime(new Date(task.start), event.start).toISOString(),
    end: setTime(new Date(task.end), event.end).toISOString(),
  };
  mutations.updateTask(updateTask);

  const upsertRepeat: UpsertRepeatInput = {
    ...task.repeat,
    exclude: [],
  };
  mutations.updateRepeat(task.id, upsertRepeat);
};

/**
 * When updating repeat instances from currently selected instance
 *
 *  1. Set end date to current task's repeat
 *  2. Create a new task with new repeat value
 */
export const repeatUpdateFromNow: EventChangeUpdate = (
  eventChange,
  mutations
) => {
  const { oldEvent, event } = eventChange;
  const task: Task = event.extendedProps?.task;
  const listId: string = event.extendedProps?.listId;

  if (!event.start || !event.end) return;

  if (!task.repeat?.freq) return;
  if (!oldEvent.start) return;

  const newRepeat: UpsertRepeatInput = {
    freq: task.repeat.freq,
    start: task.repeat.start,
    end: task.repeat.end,
    byweekday: task.repeat.byweekday,
    exclude: [],
  };

  const newTask: CreateTaskInput = {
    ...task,
    title: task.title + " (copy)",
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    repeat: newRepeat,
  };
  mutations.createTask(listId, newTask);

  const upsertRepeat: UpsertRepeatInput = {
    ...task.repeat,
    end: format(addDays(new Date(oldEvent.start), -1), "yyyy-MM-dd"),
  };
  mutations.updateRepeat(task.id, upsertRepeat);
};

/**
 * When updating just one repeat instance
 *
 *  1. Add exdate to current task's repeat
 *  2. Create a new task without from new time and without repeat
 */
export const repeatUpdateJustOne: EventChangeUpdate = (
  eventChange,
  mutations
) => {
  const { oldEvent, event } = eventChange;
  const task: Task = event.extendedProps?.task;
  const listId: string = event.extendedProps?.listId;

  if (!task.repeat?.freq) return;
  if (!event.start || !event.end) return;
  if (!oldEvent.start) return;

  const upsertRepeat: UpsertRepeatInput = {
    ...task.repeat,
    exclude: task.repeat.exclude
      ? [...task.repeat.exclude, format(new Date(oldEvent.start), "yyy-MM-dd")]
      : [format(new Date(oldEvent.start), "yyy-MM-dd")],
  };
  mutations.updateRepeat(task.id, upsertRepeat);

  const newTask: CreateTaskInput = {
    ...task,
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    repeat: null,
  };
  mutations.createTask(listId, newTask);
};
