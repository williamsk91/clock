import "@fullcalendar/react";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar, {
  EventChangeArg,
  EventInput,
  addDays,
} from "@fullcalendar/react";
import rrule from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Switch } from "antd";
import {
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";
import styled from "styled-components";

import {
  CreateTaskInput,
  List,
  Task,
  UpdateTaskInput,
  UpsertRepeatInput,
} from "../../graphql/generated";
import { useCalendarContext } from "../context/CalendarContext";
import { listIsNotDeleted } from "../listFilter";
import { RepeatUpdateModal } from "../RepeatUpdateModal";
import { homeTaskSettingRoute } from "../route";
import { Text } from "../Text";
import {
  applyFilterOnTask,
  taskHasDateP,
  taskIsNotDeletedP,
  taskIsNotDoneP,
} from "../utils/filter";
import {
  eventToTaskUpdateInput,
  eventUpdate,
  repeatEventUpdate,
} from "./eventUpdate";
import { parseTaskExdates } from "./repeatExclusion";
import {
  EventColor,
  defaultEventColor,
  eventColors,
  eventColors50,
} from "./styles";

interface IProp {
  lists: List[];
  createCalendarTask: (start: Date, end: Date, includeTime: boolean) => void;
  updateTask: (uti: UpdateTaskInput) => void;
  createTask: (listId: string, cti: CreateTaskInput) => void;
  updateRepeat: (taskId: string, r: UpsertRepeatInput) => void;
}

export const Calendar: FC<IProp> = (props) => {
  const {
    lists,
    updateTask,
    updateRepeat,
    createTask,
    createCalendarTask,
  } = props;
  const history = useHistory();

  const [showCompletedTask, setShowCompletedTask] = useState(false);

  const [isRepeatModalVisible, setIsRepeatModalVisible] = useState(false);
  const [
    repeatEventChange,
    setrepeatEventChange,
  ] = useState<EventChangeArg | null>(null);

  const calRef = useRef<FullCalendar>(null);
  const { setApi } = useCalendarContext();

  const filteredLists: List[] = useMemo(
    () =>
      lists
        .filter(listIsNotDeleted)
        .map(applyFilterOnTask([taskHasDateP, taskIsNotDeletedP])),
    [lists]
  );

  const events: EventInput[] = filteredLists
    .map(applyFilterOnTask(showCompletedTask ? [] : [taskIsNotDoneP]))
    .flatMap((l) => l.tasks.map((t) => taskToEventInput(l, t)));

  const mutations = {
    updateTask,
    updateRepeat,
    createTask,
  };

  useEffect(() => {
    if (!calRef.current) return;
    setApi(calRef.current.getApi());
  }, [calRef, setApi]);

  return (
    <>
      <Container>
        <Setting>
          <Text.Message>Show completed task</Text.Message>
          <Switch
            checked={showCompletedTask}
            onChange={(checked) => setShowCompletedTask(checked)}
          />
        </Setting>
        <FullCalendar
          ref={calRef}
          height="100%"
          initialView="timeGridWeek"
          plugins={[timeGridPlugin, rrule, interactionPlugin]}
          // time-axis
          slotDuration="01:00"
          slotLabelFormat={{
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }}
          // events
          eventBorderColor="transparent"
          events={events}
          editable
          droppable
          // resizing & dragging
          eventChange={(eventChange) => {
            if (eventChange.event.extendedProps.task.repeat) {
              setrepeatEventChange(eventChange);
              return setIsRepeatModalVisible(true);
            }

            eventUpdate(eventChange, mutations);
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
          select={({ start, end, allDay }) => {
            // end is modified as by default FullCalendar treats end as exclusive
            createCalendarTask(
              start,
              allDay ? addMinutes(end, -1) : end,
              !allDay
            );
          }}
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
      <RepeatUpdateModal
        isVisible={isRepeatModalVisible}
        onCancel={() => {
          setIsRepeatModalVisible(false);
          setrepeatEventChange(null);
        }}
        onUpdate={(updateType) => {
          setIsRepeatModalVisible(false);
          repeatEventChange &&
            repeatEventUpdate(repeatEventChange, mutations, updateType);
          setrepeatEventChange(null);
        }}
      />
    </>
  );
};

/**
 * Container is used to overwrite `FullCalendar` styling.
 * Scope the style to each views.
 */
const Container = styled.div`
  height: 100%;
  position: relative;

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

      &.hide-time {
        .fc-event-time {
          display: none;
        }
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

const Setting = styled.div`
  position: absolute;
  right: 24px;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-left: 6px;
  }
`;

// ------------------------- Helper Functions -------------------------

export const taskToEventInput = (list: List, task: Task): EventInput => {
  const { id, title } = task;

  const minuteDuration =
    !!task.start &&
    !!task.end &&
    differenceInMinutes(new Date(task.end), new Date(task.start));

  // classNames for styling
  const classNames = [];
  minuteDuration <= 45 &&
    classNames.push(...["short-duration-event", "hide-time"]);

  const colorSet = task.done ? eventColors50 : eventColors;

  return {
    id,
    title,

    /** Timestamp */
    start: task.start ?? undefined,
    end: task.end ?? undefined,
    allDay: !task.includeTime,

    /** Repeating tasks */
    rrule: taskToEventRRule(task),
    exdate: parseTaskExdates(task),

    /**
     * Repeating task requires special explicit duration.
     */
    duration: eventDuration(
      task.start,
      task.end,
      !!task.repeat,
      !task.includeTime
    ),

    /** Style */
    backgroundColor: colorSet[(task.color as EventColor) ?? defaultEventColor],
    borderColor: colorSet[(list.color as EventColor) ?? defaultEventColor],
    classNames,

    /**
     * Extra props are required to get full information of the task.
     */
    listId: list.id,
    task,
  };
};

const taskToEventRRule = (task: Task): EventInput["rrule"] | undefined => {
  if (!task.repeat || !task.start) return;

  /**
   * Converting start date in UTC to local time.
   * If providing dtstart in UTC Fullcalendar should convert the time to used timezone.
   * However, there is a bug that causes this conversion to not occur.
   *
   * This conversion should be removed if when passing task.start as dtstart the date displayed
   * is correct and not offset by timezone.
   *
   * @issue https://github.com/fullcalendar/fullcalendar/issues/5993#issuecomment-738280358
   */
  const offsetTz = (d: Date) =>
    new Date(+d - new Date().getTimezoneOffset() * 60000);
  const dtstart = offsetTz(new Date(task.start));
  const until = task.repeat.end
    ? format(addDays(new Date(task.repeat.end), 1), "yyyy-MM-dd")
    : null;

  return {
    dtstart,
    freq: task.repeat.freq,
    byweekday: task.repeat.byweekday,
    until,
  };
};

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
