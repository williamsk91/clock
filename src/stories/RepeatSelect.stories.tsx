import { useState } from "react";

import { RepeatSelect } from "../components/Settings";
import { Mini } from "../components/styles/layout";
import { Repeat, RepeatFrequency } from "../graphql/generated";

export default {
  title: "Components / RepeatSelect",
  decorators: [
    (Story: any) => (
      <Mini.Container>
        <Story />
      </Mini.Container>
    ),
  ],
};

const RepeatSelectStory = (props: { repeat: Repeat | null }) => {
  const [repeat, setRepeat] = useState<Repeat | null>(props.repeat);

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

export const none = () => <RepeatSelectStory repeat={null} />;

export const daily = () => (
  <RepeatSelectStory
    repeat={{
      id: "repeatId",
      freq: RepeatFrequency.Daily,
      byweekday: null,
      end: new Date().toISOString(),
      exclude: [],
    }}
  />
);

export const weekly = () => (
  <RepeatSelectStory
    repeat={{
      id: "repeatId",
      freq: RepeatFrequency.Weekly,
      byweekday: ["MO", "WE", "TH"],
      end: new Date().toISOString(),
      exclude: [],
    }}
  />
);

export const monthly = () => (
  <RepeatSelectStory
    repeat={{
      id: "repeatId",
      freq: RepeatFrequency.Monthly,
      byweekday: null,
      end: new Date().toISOString(),
      exclude: [],
    }}
  />
);

export const yearly = () => (
  <RepeatSelectStory
    repeat={{
      id: "repeatId",
      freq: RepeatFrequency.Yearly,
      byweekday: null,
      end: new Date().toISOString(),
      exclude: [],
    }}
  />
);

export const noEnd = () => (
  <RepeatSelectStory
    repeat={{
      id: "repeatId",
      freq: RepeatFrequency.Weekly,
      byweekday: ["MO"],
      end: null,
      exclude: [],
    }}
  />
);
