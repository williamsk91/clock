import React from "react";

import { Select } from "antd";
import { getDay } from "date-fns";
import styled from "styled-components";

import { Repeat, RepeatInput } from "../../graphql/generated";
import { RoundCheck } from "../RoundCheck";
import { Spacer } from "../Spacer";

interface Props {
  start: Date;
  repeat: Repeat | null;
  updateRepeat: (r: Repeat | null) => void;
}

/**
 * Repeat picker.
 *
 * This could be daily, weekly, monthly, or yearly.
 * When set to weekly, days can be selected individually.
 */
export const RepeatSelect = (props: Props) => {
  const { start, repeat, updateRepeat } = props;
  return (
    <div>
      <RepeatSelectContainer>
        <Select
          style={{ width: "100%" }}
          value={repeat?.freq}
          onChange={(value) => {
            let byweekday: number[] | null = null;
            if (value === "weekly") {
              // date fns 0 is different from rrule 0
              const weekday = getDay(start);
              const startingWeekday = weekday === 0 ? 6 : weekday - 1;

              byweekday = [startingWeekday];
            }

            const newRepeat: RepeatInput | null = value
              ? {
                  freq: value,
                  byweekday,
                }
              : null;

            updateRepeat(newRepeat);
          }}
          placeholder="Repeat"
          allowClear
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      </RepeatSelectContainer>
      {!!repeat?.byweekday && (
        <>
          <Spacer spacing="6" />
          <WeeklySelect
            checkedWeekdays={repeat.byweekday}
            onChange={(byweekday) =>
              updateRepeat({ freq: repeat.freq, byweekday })
            }
          />
        </>
      )}
    </div>
  );
};

const RepeatSelectContainer = styled.div`
  width: 102px;
`;

interface WeeklySelectProps {
  checkedWeekdays: number[];
  onChange: (checkedWeekdays: number[]) => void;
}

/**
 * Checkable weekday select to choose which weekday will the task repeat on.
 */
const WeeklySelect = ({ checkedWeekdays, onChange }: WeeklySelectProps) => {
  const checkProps = (weekday: number) => {
    const checked = checkedWeekdays.includes(weekday);
    return {
      checked,
      onClick: () => {
        const newCheckedWeekdays = checked
          ? checkedWeekdays.filter((cw) => cw !== weekday)
          : [...checkedWeekdays, weekday];
        onChange(newCheckedWeekdays);
      },
    };
  };

  return (
    <WeeklySelectContainer>
      <RoundCheck text="Mo" {...checkProps(0)} />
      <RoundCheck text="Tu" {...checkProps(1)} />
      <RoundCheck text="We" {...checkProps(2)} />
      <RoundCheck text="Th" {...checkProps(3)} />
      <RoundCheck text="Fr" {...checkProps(4)} />
      <RoundCheck text="Sa" {...checkProps(5)} />
      <RoundCheck text="Su" {...checkProps(6)} />
    </WeeklySelectContainer>
  );
};

const WeeklySelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 30px);
  grid-gap: 6px;
`;
