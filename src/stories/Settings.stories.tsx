import { useState } from "react";

import { EventColor } from "../components/Calendar/styles";
import { ColorSelect, DatePicker, RepeatSelect } from "../components/Settings";
import { Mini } from "../components/styles/layout";
import { Repeat } from "../graphql/generated";

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

const RepeatSelectStory = () => {
  const [repeat, setRepeat] = useState<Repeat | null>({
    freq: "weekly",
    byweekday: [0, 1, 2, 3, 4, 5, 6],
  });

  return (
    <RepeatSelect
      start={new Date()}
      repeat={repeat}
      updateRepeat={(r) => setRepeat(r)}
    />
  );
};

export const repeatSelect = () => <RepeatSelectStory />;

const DatePickerStory = () => {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <DatePicker
      value={[start, end]}
      onChange={([start, end]) => {
        setStart(start);
        setEnd(end);
      }}
      includeTime={true}
    />
  );
};

export const datePicker = () => <DatePickerStory />;
