import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React from "react";
import {
  DateRange,
  DateRangePicker,
  IDatePickerDayModifiers,
  TimePrecision
} from "@blueprintjs/datetime";
import { addDays } from "date-fns";
import styled from "styled-components";

import { Repeat } from "../graphql/generated";
import { repeatToRRule } from "./datetime";

interface Props {
  value: DateRange;
  onChange: (date: DateRange) => void;

  repeat: Repeat | null;

  includeTime: boolean;
  /**
   * This is to extend the container style using
   * Styled-Components
   */
  className?: string;
}

/**
 * A Date and time range picker
 */
export const DatePicker = (props: Props) => {
  const { value, onChange, repeat, includeTime } = props;

  const repeatModifiers = repeat
    ? genRepeatModifiers(repeat, value[0] ?? undefined)
    : undefined;

  const betweenModifiers = value[0] &&
    value[1] && { between: { before: value[1], after: value[0] } };

  return (
    <StyledDateRangePicker
      value={value}
      onChange={onChange}
      timePrecision={includeTime ? TimePrecision.MINUTE : undefined}
      shortcuts={false}
      allowSingleDayRange
      singleMonthOnly
      dayPickerProps={{
        firstDayOfWeek: 1,
        modifiers: {
          ...repeatModifiers,
          ...betweenModifiers
        },
        renderDay: dayCell
      }}
    />
  );
};

const genRepeatModifiers = (repeat: Repeat, start?: Date) => {
  const rrule = repeatToRRule(repeat, start);

  return {
    repeat: (d: Date) => {
      const after = new Date(d.setHours(0, 0, 0));
      const before = addDays(after, 1);
      const dates = rrule.between(after, before);
      return dates.length >= 1;
    }
  };
};

const StyledDateRangePicker = styled(DateRangePicker)`
  .DayPicker-Day--today {
    &,
    &:hover {
      color: hsl(352, 98%, 54%);
    }
  }
  .DayPicker-Day--selected {
    &,
    &:hover {
      color: white;
    }
  }
  .DayPicker-Day--between {
    background: #ebf1f5;
    border-radius: 0;
  }
`;

/**
 * Display date and dot to indicate repeat events
 */
const dayCell = (d: Date, modifiers: IDatePickerDayModifiers) => {
  return (
    <DayCellContainer>
      <div>{d.getDate()}</div>
      <DayCellDot color={modifiers["repeat"] ? "#50D989" : "transparent"} />
    </DayCellContainer>
  );
};

const DayCellContainer = styled.div`
  position: relative;
`;

const DayCellDot = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 6px;

  position: absolute;
  left: 50%;
  margin-left: -3px;

  background: ${p => p.color};
`;
