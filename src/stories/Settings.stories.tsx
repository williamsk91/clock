import { useState } from "react";

import { EventColor } from "../components/Calendar/styles";
import {
  ColorSelect,
  DateTimeRangePicker,
  RepeatSelect,
} from "../components/Settings";
import { Mini } from "../components/styles/layout";
import { Repeat, RepeatFrequency } from "../graphql/generated";

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
    id: "repeatId",
    freq: RepeatFrequency.Weekly,
    byweekday: ["MO", "WE", "TH"],
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    exclude: [],
  });

  return (
    <RepeatSelect
      start={new Date()}
      repeat={repeat}
      updateRepeat={(r) => {
        if (!repeat) return setRepeat(null);
        setRepeat({ ...repeat, ...r });
      }}
    />
  );
};

export const repeatSelect = () => <RepeatSelectStory />;

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
