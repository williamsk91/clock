import "./style.scss";

import React, { FC, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import { Task } from "../../graphql/generated";
import timeGridPlugin from "@fullcalendar/timegrid";

interface IProp {
  tasks: Task[];
  setStart: (id: string, d: string | undefined) => void;
  setEnd: (id: string, d: string | undefined) => void;
}

export const Calendar: FC<IProp> = props => {
  const cal = useRef<FullCalendar>(null);
  const { tasks } = props;

  const events = tasks.map(t => ({
    ...t,
    allDay: !t.includeTime
  }));

  return (
    <div>
      <FullCalendar
        ref={cal}
        height={900}
        defaultView="timeGridWeek"
        plugins={[timeGridPlugin]}
        events={events}
        header={{
          left: "title",
          right: "prev,today,next"
        }}
        nowIndicator
        // locale
        firstDay={1}
      />
    </div>
  );
};
