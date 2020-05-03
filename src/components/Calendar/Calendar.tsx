import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import React, { FC, useCallback, useMemo, useRef } from "react";

import { ICalendarInfo } from "tui-calendar";
import { Navigation } from "./Navigation";
import TUICalendar from "@toast-ui/react-calendar";
import { Task } from "../../graphql/generated";
import { colors } from "../../styles/colors";

interface IProp {
  tasks: Task[];
  setStart: (id: string, d: string | undefined) => void;
  setEnd: (id: string, d: string | undefined) => void;
}

const noop = () => null;

export const Calendar: FC<IProp> = props => {
  const { tasks, setStart, setEnd } = props;
  const cal = useRef<TUICalendar>(null);

  const schedules: any[] = useMemo(
    () =>
      tasks
        .filter(t => !!t.start)
        .map(t => ({
          ...t,
          calendarId: "1",
          category: "time"
        })),
    [tasks]
  );

  const onPrev = useCallback(() => cal.current?.getInstance().prev() ?? noop, [
    cal.current
  ]);

  const onNext = useCallback(() => cal.current?.getInstance().next() ?? noop, [
    cal.current
  ]);

  const onNow = useCallback(() => cal.current?.getInstance().today() ?? noop, [
    cal.current
  ]);

  return (
    <div>
      <Navigation
        date={new Date()}
        onPrev={onPrev}
        onNow={onNow}
        onNext={onNext}
      />
      <TUICalendar
        ref={cal}
        height="900px"
        taskView={false}
        week={{ startDayOfWeek: 1 }}
        schedules={schedules}
        disableClick
        disableDblClick
        onBeforeUpdateSchedule={({ schedule, changes }) => {
          const { id, calendarId } = schedule;

          if (!id || !calendarId || !changes) return;

          const { start, end } = changes;
          start && setStart(id, start.toString());
          end && setEnd(id, end.toString());
          cal.current?.getInstance();
          cal.current?.getInstance().updateSchedule(id, calendarId, changes);
        }}
        calendars={calendars}
        usageStatistics={false}
      />
    </div>
  );
};

// used for base styling
const calendars: ICalendarInfo[] = [
  {
    id: "1",
    name: "",
    color: "rgba(55, 53, 47, 0.85)",
    bgColor: "#fff",
    dragBgColor: "transparent",
    borderColor: colors.red
  }
];
