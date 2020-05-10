import "./style.scss";

import React, { FC, useRef } from "react";
import { Task, UpdateTaskInput } from "../../graphql/generated";

import { EventApi } from "@fullcalendar/core";
import { EventSourceInput } from "@fullcalendar/core/structs/event-source";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

interface IProp {
  tasks: Task[];
  updateTask: (uti: UpdateTaskInput) => void;
}

export const Calendar: FC<IProp> = props => {
  const { tasks, updateTask } = props;

  const cal = useRef<FullCalendar>(null);

  const events: EventSourceInput = tasks.map(t => ({
    ...t,
    allDay: !t.includeTime
  }));

  return (
    <FullCalendar
      ref={cal}
      height="parent"
      defaultView="timeGridWeek"
      plugins={[timeGridPlugin, interactionPlugin]}
      events={events}
      header={{
        left: "title",
        right: "prev,today,next"
      }}
      nowIndicator
      editable
      // resizing
      eventResize={({ event }) => {
        updateTask(eventToTaskUpdateInput(event));
      }}
      // dragging
      eventDrop={({ event }) => {
        updateTask(eventToTaskUpdateInput(event));
      }}
      // header
      columnHeaderHtml={d => {
        const date = d as Date;
        return `<p class="weekday">${format(date, "EEE")}</p>
        <p class="day">${format(date, "d")}</p>`;
      }}
      allDayText=""
      // locale
      firstDay={1}
    />
  );
};

// ------------------------- Helper Functions -------------------------
const eventToTaskUpdateInput = (e: EventApi): UpdateTaskInput => ({
  id: e.id,
  title: e.title,
  done: e.extendedProps.done,
  start: e.start?.toISOString() ?? null,
  end: e.end?.toISOString() ?? null,
  includeTime: !e.allDay
});
