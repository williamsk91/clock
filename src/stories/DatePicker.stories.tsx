import React, { useState } from "react";

import { DatePicker } from "../components/DatePicker";
import { MiniLayout } from "../components/styles/layout";

export default { title: "Components / DatePicker" };

const Base = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);
  const [includeTime, setIncludeTime] = useState(false);
  const [color, setColor] = useState<string | null>(null);

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
      color={color}
      updateColor={c => setColor(c)}
    />
  );
};
export const base = () => (
  <MiniLayout>
    <Base />
  </MiniLayout>
);
