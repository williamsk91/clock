import "@fullcalendar/react";

import React, { FC, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar, { EventApi, EventInput } from "@fullcalendar/react";
import rrule from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";
import styled from "styled-components";

import { List, Task, UpdateTaskInput } from "../../graphql/generated";
import { useCalendarContext } from "../context/CalendarContext";
import { homeTaskSettingRoute } from "../route";
import { hasDateP, isNotDoneP } from "../taskFilter";

interface IProp {
  lists: List[];
  updateTask: (uti: UpdateTaskInput) => void;
  createTask: (start: Date, end: Date, includeTime: boolean) => void;
}

export const Calendar: FC<IProp> = (props) => {
  const { lists, updateTask, createTask } = props;
  const history = useHistory();
  const calRef = useRef<FullCalendar>(null);
  const { setApi } = useCalendarContext();

  const events: EventInput[] = lists.flatMap((l) =>
    l.tasks
      .filter(hasDateP)
      .filter(isNotDoneP)
      .map((t) => taskToEventInput(l, t))
  );

  useEffect(() => {
    if (!calRef.current) return;
    setApi(calRef.current.getApi());
  }, [calRef, setApi]);

  return (
    <Container>
      <FullCalendar
        ref={calRef}
        height="100%"
        initialView="timeGridWeek"
        plugins={[timeGridPlugin, rrule, interactionPlugin]}
        // time-axis
        slotDuration="01:00"
        slotLabelFormat={{ hour: "numeric", minute: "numeric", hour12: false }}
        // events
        eventBorderColor="transparent"
        events={events}
        editable
        droppable
        // resizing & dragging
        eventChange={({ event }) => {
          updateTask(eventToTaskUpdateInput(event));
        }}
        // dropping - drop from task list
        eventReceive={({ event, view }) => {
          const updateInput = eventToTaskUpdateInput(event);
          updateTask(updateInput);
          /**
           * Very bad hack to prevent duplicate events from rendering.
           * To check if it safe to remove this try drag and drop an event
           *  from TaskList to calendar. If there's only **1** event in the
           *  calendar then it is safe to remove.
           */
          view.calendar.removeAllEvents();
        }}
        // clicking
        eventClick={({ event }) => {
          calRef.current?.getApi().unselect();
          history.push(
            homeTaskSettingRoute(event.extendedProps.listId, event.id)
          );
        }}
        // selecting - creating new task
        selectable
        selectMirror
        unselectAuto={false}
        snapDuration="00:30"
        select={({ start, end, allDay }) =>
          // end is modified as by default FullCalendar treats end as exclusive
          createTask(start, allDay ? addMinutes(end, -1) : end, !allDay)
        }
        // Labels
        headerToolbar={{
          left: "prev,today,next",
          right: undefined,
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
      .fc-col-header-cell-cushion:hover {
        text-decoration: none;
      }
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
      :hover {
        text-decoration: none;
      }
      border-width: 0 0 0 6px;
    }

    /* event */
    .fc-timegrid-event {
      padding: 3px 4px;
      :hover {
        text-decoration: none;
      }
      border-width: 0 0 0 6px;
      &.short-duration-event .fc-event-main {
        display: flex;
        .fc-event-time {
          margin-right: 3px;
        }
      }

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

export const taskToEventInput = (list: List, task: Task): EventInput => {
  const { id, title } = task;

  // classNames for styling
  const classNames = [];
  task.start &&
    task.end &&
    differenceInMinutes(new Date(task.end), new Date(task.start)) <= 45 &&
    classNames.push("short-duration-event");

  return {
    id,
    title,

    /** Timestamp */
    start: task.start ?? undefined,
    end: task.end ?? undefined,
    allDay: !task.includeTime,

    /** Repeating tasks */
    // dtstart is required
    rrule: task.repeat
      ? {
          byweekday: task.repeat.byweekday,
          freq: task.repeat.freq,
          dtstart: task.start,
        }
      : null,
    /**
     * Repeating task have requires special explicit duration.
     */
    duration: eventDuration(
      task.start,
      task.end,
      !!task.repeat,
      !task.includeTime
    ),
    // this is to move recurring dates together
    groupId: id,

    /** Style */
    backgroundColor: task.color ?? undefined,
    borderColor: list.color ?? undefined,
    classNames,

    /**
     * Extra props are required to get full information of the task.
     * Check `eventToTaskUpdateInput`
     */
    listId: list.id,
    done: task.done,
    order: task.order,
    repeat: task.repeat,
    eventColor: task.color,
  };
};

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
    ? {
        freq: e.extendedProps.repeat.freq,
        byweekday: e.extendedProps.repeat.byweekday,
      }
    : null,
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
    minute: differenceInMinutes(endDate, startDate),
  };
};
