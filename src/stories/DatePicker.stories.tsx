import React, { useState } from "react";

import { DatePicker } from "../components/DatePicker";

export default { title: "Components / DatePicker" };

const Base = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);
  const [includeTime, setIncludeTime] = useState(false);

  return (
    <DatePicker
      start={start}
      end={end}
      includeTime={includeTime}
      setIncludeTime={setIncludeTime}
      updateDates={dates => {
        setEnd(dates[0]);
        setStart(dates[1]);
      }}
      repeat={null}
      updateRepeat={() => null}
    />
  );
};
export const base = () => <Base />;
