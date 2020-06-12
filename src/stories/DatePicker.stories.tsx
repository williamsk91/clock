import React, { useState } from "react";

import { DatePicker } from "../components/DatePicker";
import { MiniLayout } from "../components/styles/layout";

export default { title: "Components / DatePicker" };

const Base = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <DatePicker
      value={[start, end]}
      onChange={([start, end]) => {
        setStart(start);
        setEnd(end);
      }}
      repeat={{
        freq: "weekly",
        byweekday: [0, 1, 2, 3, 6]
      }}
      includeTime={true}
    />
  );
};
export const base = () => (
  <MiniLayout>
    <Base />
  </MiniLayout>
);
