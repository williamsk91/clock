import { useState } from "react";

import { EventColor } from "../components/Calendar/styles";
import { ColorSelect, DateTimeRangePicker } from "../components/Settings";
import { Mini } from "../components/styles/layout";

export default {
  title: "Components / Settings",
  decorators: [
    (Story: any) => (
      <Mini.Container>
        <Story />
      </Mini.Container>
    ),
  ],
};

const ColorSelectStory = () => {
  const [color, setColor] = useState<EventColor | null>(null);
  return <ColorSelect activeColor={color} updateColor={(c) => setColor(c)} />;
};

export const colorSelect = () => <ColorSelectStory />;

const DateTimeRangePickerStory = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <DateTimeRangePicker
      value={[start, end]}
      onChange={([start, end]) => {
        setStart(start);
        setEnd(end);
      }}
      includeTime={true}
    />
  );
};

export const dateTimeRangePicker = () => <DateTimeRangePickerStory />;
