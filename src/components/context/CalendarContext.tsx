import { FC, createContext, useContext, useState } from "react";
import { CalendarApi } from "@fullcalendar/react";

interface ContextValue {
  api: CalendarApi | null;
  setApi: (api: CalendarApi) => void;
}

const CalendarContext = createContext<ContextValue>({
  api: null,
  setApi: () => null,
});

export const CalendarProvider: FC = ({ children }) => {
  const [api, setApi] = useState<CalendarApi | null>(null);

  return (
    <CalendarContext.Provider value={{ api, setApi }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
