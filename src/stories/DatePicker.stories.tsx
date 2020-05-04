import React, { useState } from "react";

import { DatePicker } from "../components/DatePicker";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components | DatePicker", module);

story.add("base", () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);
  const [includeTime, setIncludeTime] = useState(false);

  return (
    <DatePicker
      start={start}
      setStart={setStart}
      end={end}
      setEnd={setEnd}
      includeTime={includeTime}
      setIncludeTime={setIncludeTime}
    />
  );
});
