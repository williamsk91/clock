import React, { useState } from "react";

import { DatePicker } from "../components/DatePicker";
import { storiesOf } from "@storybook/react";

const story = storiesOf("Components | DatePicker", module);

story.add("base", () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hasTime, setHasTime] = useState<boolean>(false);
  return (
    <DatePicker
      start={date}
      setStart={setDate}
      hasTime={hasTime}
      setHasTime={setHasTime}
    />
  );
});
