import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import { ICalendarInfo, ISchedule, TZDate } from "tui-calendar";
import React, { FC, useMemo, useRef } from "react";

import { ITask } from "./types";
import TUICalendar from "@toast-ui/react-calendar";

interface IProp {
  tasks: ITask[];
  setStart: (id: string, d: string | undefined) => void;
  setEnd: (id: string, d: string | undefined) => void;
}

const calendars: ICalendarInfo[] = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  }
];

export const Calendar: FC<IProp> = props => {
  const { tasks, setStart, setEnd } = props;
  const cal = useRef<TUICalendar>(null);

  const schedules: ISchedule[] = useMemo(
    () =>
      tasks.map(t => ({
        ...t,
        calendarId: "1",
        category: "time",
        body: "Test"
      })),
    []
  );

  return (
    <TUICalendar
      ref={cal}
      height="900px"
      taskView={false}
      week={{ startDayOfWeek: 1 }}
      schedules={schedules}
      calendars={calendars}
      disableClick
      disableDblClick
      onBeforeUpdateSchedule={({ schedule, changes }) => {
        const { id, calendarId } = schedule;

        if (!id || !calendarId || !changes) return;

        const { start, end } = changes;
        start && setStart(id, start.toString());
        end && setEnd(id, end.toString());

        cal.current?.getInstance().updateSchedule(id, calendarId, changes);
      }}
    />
  );
};
