import React, { FC, useRef } from "react";
import { format } from "date-fns";

import { EventApi, EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import { Task, UpdateTaskInput } from "../../graphql/generated";

interface IProp {
  tasks: Task[];
  updateTask: (uti: UpdateTaskInput) => void;
}

export const Calendar: FC<IProp> = props => {
  const { tasks, updateTask } = props;

  const cal = useRef<FullCalendar>(null);

  const events: EventInput[] = tasks.map(t => ({
    ...t,
    start: t.start ?? undefined,
    end: t.start ?? undefined,
    allDay: !t.includeTime
  }));

  return (
    <FullCalendar
      ref={cal}
      initialView="timeGridWeek"
      plugins={[timeGridPlugin, interactionPlugin]}
      events={events}
      editable
      // Labels
      headerToolbar={{
        left: "title",
        right: "prev,today,next"
      }}
      nowIndicator
      // resizing
      eventResize={({ event }) => {
        updateTask(eventToTaskUpdateInput(event));
      }}
      // dragging
      eventDrop={({ event }) => {
        updateTask(eventToTaskUpdateInput(event));
      }}
      // header
      dayHeaderContent={({ date }) => (
        <>
          <p className="weekday">{format(date, "EEE")}</p>
          <p className="day">{format(date, "d")}</p>
        </>
      )}
      allDayText=""
      // events
      eventBackgroundColor="white"
      eventBorderColor="rgba(55, 53, 47, 0.85)"
      eventTextColor="rgba(55, 53, 47, 0.85)"
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
  includeTime: !e.allDay,
  order: e.extendedProps.order
});
