import "@fullcalendar/react";

import React, { FC, useRef } from "react";
import {
  differenceInDays,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  format
} from "date-fns";
import styled from "styled-components";

import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar, { EventApi } from "@fullcalendar/react";
import rrule from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";

import { Task, UpdateTaskInput } from "../../graphql/generated";

interface IProp {
  tasks: Task[];
  updateTask: (uti: UpdateTaskInput) => void;
}

export const Calendar: FC<IProp> = props => {
  const { tasks, updateTask } = props;

  const cal = useRef<FullCalendar>(null);

  const events: EventInput[] = tasksToEventInput(tasks);

  return (
    <Container>
      <FullCalendar
        ref={cal}
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, rrule, interactionPlugin]}
        // time-axis
        slotDuration="01:00:00"
        slotLabelFormat={{ hour: "numeric", minute: "numeric", hour12: false }}
        // events
        events={events}
        eventBorderColor="transparent"
        editable
        // resizing
        eventResize={({ event }) => updateTask(eventToTaskUpdateInput(event))}
        // dragging
        eventDrop={({ event }) => updateTask(eventToTaskUpdateInput(event))}
        // Labels
        headerToolbar={{
          left: "title",
          right: "prev,today,next"
        }}
        nowIndicator
        dayHeaderContent={({ date }) => (
          <>
            <p className="weekday">{format(date, "EEE")}</p>
            <p className="day">{format(date, "d")}</p>
          </>
        )}
        allDayText=""
        // locale
        firstDay={1}
      />
    </Container>
  );
};

// ------------------------- Helper Functions -------------------------
const tasksToEventInput = (tasks: Task[]): EventInput[] =>
  tasks.map(t => {
    const { id, title } = t;

    delete t.repeat?.__typename;
    return {
      id,
      title,

      /** Timestamp */
      start: t.start ?? undefined,
      end: t.end ?? undefined,
      allDay: !t.includeTime,

      /** Repeating tasks */
      // dtstart is required
      rrule: t.repeat ? { ...t.repeat, dtstart: t.start } : null,
      /**
       * Repeating task have requires special explicit duration.
       */
      duration: eventDuration(t.start, t.end, !!t.repeat, !t.includeTime),
      // this is to move recurring dates together
      groupId: id,

      /** Style */
      backgroundColor: t.color ?? undefined
    };
  });

const eventToTaskUpdateInput = (e: EventApi): UpdateTaskInput => ({
  id: e.id,
  title: e.title,
  done: e.extendedProps?.done,
  start: e.start?.toISOString() ?? null,
  end: e.end?.toISOString() ?? null,
  includeTime: !e.allDay,
  color: e.extendedProps?.color,
  order: e.extendedProps.order,
  repeat: e.extendedProps?.repeat
});

/**
 * Get event duration.
 * This needs to be explicitly defined when used with `repeat`.
 * Except when it is an allDay.
 *
 * https://fullcalendar.io/docs/v5/rrule-plugin
 */
const eventDuration = (
  start: string | null,
  end: string | null,
  isRecurring: boolean,
  allDay: boolean
) => {
  if (!isRecurring) return undefined;
  if (allDay) return undefined;
  if (!start || !end) return undefined;

  const endDate = new Date(end);
  const startDate = new Date(start);
  return {
    year: differenceInYears(endDate, startDate),
    month: differenceInMonths(endDate, startDate),
    day: differenceInDays(endDate, startDate),
    minute: differenceInMinutes(endDate, startDate)
  };
};

/**
 * Container is used to overwrite `FullCalendar` styling.
 * Scope the style to each views.
 */
const Container = styled.div`
  .fc-timegrid {
    .fc-timegrid-slot {
      height: 48px;
    }

    /* allDay event */
    .fc-daygrid-event {
      padding: 0 6px;
      font-size: 16px;
    }

    .fc-timegrid-event {
      padding: 3px 6px;
      .fc-event-time {
        font-size: 12px;
      }

      font-size: 16px;
    }
  }
`;
