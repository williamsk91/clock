import "@fullcalendar/react";

import React, { FC, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  createTask: (start: Date, end: Date, includeTime: boolean) => void;
}

export const Calendar: FC<IProp> = props => {
  const { tasks, updateTask, createTask } = props;
  const history = useHistory();

  const cal = useRef<FullCalendar>(null);

  const events: EventInput[] = tasksToEventInput(tasks);

  return (
    <Container>
      <FullCalendar
        ref={cal}
        height="100%"
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, rrule, interactionPlugin]}
        // time-axis
        slotDuration="01:00"
        slotLabelFormat={{ hour: "numeric", minute: "numeric", hour12: false }}
        // events
        events={events}
        eventBorderColor="transparent"
        editable
        // clicking
        eventClick={({ event }) => history.push(`/task/${event.id}`)}
        // selecting
        selectable
        selectMirror
        unselectCancel=".new-calendar-event-input"
        snapDuration="00:30"
        select={({ start, end, allDay }) => createTask(start, end, !allDay)}
        // resizing
        eventResize={({ event }) => updateTask(eventToTaskUpdateInput(event))}
        // dragging
        eventDrop={({ event }) => updateTask(eventToTaskUpdateInput(event))}
        // Labels
        headerToolbar={{
          left: "prev,today,next",
          right: undefined
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

/**
 * Container is used to overwrite `FullCalendar` styling.
 * Scope the style to each views.
 */
const Container = styled.div`
  height: 100%;

  /* toolbar */
  .fc-header-toolbar {
    margin-left: 24px;
    margin-bottom: 12px;
    .fc-button {
      &,
      &:active:focus {
        color: rgba(55, 53, 47, 0.85);
        background-color: transparent;
        border: none;
        box-shadow: none;
      }
    }
  }

  .fc-timegrid {
    /* table */
    table {
      border: none;
    }

    /* header */
    .fc-col-header-cell {
      border: none;
      background: none;
      .weekday {
        color: rgba(55, 53, 47, 0.65);
      }
      .day {
        font-size: 36px;
        color: rgba(55, 53, 47, 0.85);
      }

      /* heading today */
      &.fc-day-today {
        .weekday {
          color: rgba(253, 22, 54, 0.65);
        }
        .day {
          color: rgba(253, 22, 54, 0.85);
        }
      }
    }

    /* scrollbar in header and allday */
    .fc-scroller {
      overflow: hidden auto !important;
    }

    /* allday */
    .fc-daygrid-day {
      background: #f7f8f7;
    }

    /* columns */
    .fc-timegrid-col {
      background: #f7f8f7;
    }

    /* time axis */
    .fc-timegrid-axis {
      border: none;
    }
    .fc-timegrid-slot {
      font-size: 12px;
      color: rgba(55, 53, 47, 0.65);
    }

    /* slot */
    .fc-timegrid-slot {
      height: 48px;
    }

    /* allDay event */
    .fc-daygrid-event {
      padding: 0 4px;
      font-size: 14px;
    }

    /* event */
    .fc-timegrid-event {
      padding: 3px 4px;
      .fc-event-time {
        font-size: 12px;
      }
      font-size: 14px;
    }

    /* event creation */
    .fc-event-mirror {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    /* done events */
    .fc-timegrid-event {
      &.done {
        text-decoration: line-through white solid;
      }
    }
    .fc-daygrid-event {
      &.done {
        text-decoration: line-through white solid;
      }
    }

    /* divider */
    .fc-divider {
      padding: 0;
      border: none;
    }
  }
`;

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
      backgroundColor: t.color ?? undefined,
      classNames: t.done ? ["done"] : [],

      /**
       * Extra props are required to get full information of the task.
       * Check eventToTaskUpdateInput
       */
      done: t.done,
      order: t.order,
      repeat: t.repeat,
      eventColor: t.color
    };
  });

const eventToTaskUpdateInput = (e: EventApi): UpdateTaskInput => ({
  id: e.id,
  title: e.title,
  done: e.extendedProps?.done,
  start: e.start?.toISOString() ?? null,
  end: e.end?.toISOString() ?? null,
  includeTime: !e.allDay,
  color: e.extendedProps?.eventColor,
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
