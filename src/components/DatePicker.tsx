import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React from "react";
import {
  DateRange,
  DateRangePicker,
  TimePrecision
} from "@blueprintjs/datetime";
import styled from "styled-components";

interface Props {
  value: DateRange;
  onChange: (date: DateRange) => void;

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
  const { value, onChange, includeTime } = props;

  return (
    <StyledDateRangePicker
      value={value}
      onChange={onChange}
      timePrecision={includeTime ? TimePrecision.MINUTE : undefined}
      shortcuts={false}
      allowSingleDayRange
      singleMonthOnly
      dayPickerProps={{
        firstDayOfWeek: 1
      }}
    />
  );
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
`;
