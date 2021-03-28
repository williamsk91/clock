import { useState } from "react";

import { DatePicker } from "../components/DatePicker";

export default { title: "Components / DatePicker", component: DatePicker };

const BaseStory = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      value={date}
      onChange={(d) => setDate(d)}
      format="yyyy MMM dd"
    />
  );
};

export const base = () => <BaseStory />;
