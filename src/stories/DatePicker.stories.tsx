import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { DatePicker } from "../components/DatePicker";

const story = storiesOf("Components | DatePicker", module);

story.add("base", () => {
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
    />
  );
});
