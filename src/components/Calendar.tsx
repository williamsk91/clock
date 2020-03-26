import "./calendar.scss"; // webpack must be configured to do this

import React, { FC } from "react";

import FullCalendar from "@fullcalendar/react";
import { ITask } from "./types";
import dayGridPlugin from "@fullcalendar/daygrid";

interface IProp {
  tasks: ITask[];
}

export const Calendar: FC<IProp> = props => {
  const events = props.tasks.map(t => ({
    ...t,
    backgroundColor: "transparent",
    borderColor: "transparent",
    textColor: "rgba(55, 53, 47, 0.75)"
  }));

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={events}
      header={false}
    />
  );
};
