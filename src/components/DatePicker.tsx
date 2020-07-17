import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { DateInput, DateRange, TimePrecision } from "@blueprintjs/datetime";
import { Button } from "antd";
import { addHours, format, isAfter, isBefore } from "date-fns";
import styled from "styled-components";

import { Spacer } from "./Spacer";

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
 * A Date and time range picker.
 * endDate will never be before the startDate
 */
export const DatePicker = (props: Props) => {
  const { value, onChange, includeTime } = props;

  const start = value[0];
  const end = value[1];

  return (
    <div>
      <SingleDatePicker
        value={start}
        onChange={(d) => {
          if (!d) return onChange([null, end]);

          const newStart = end && isBefore(end, d) ? addHours(end, -1) : d;
          onChange([newStart, end]);
        }}
        maxDate={end ?? undefined}
        placeholder="start date"
        includeTime={includeTime}
      />
      <Spacer spacing="6" />
      <SingleDatePicker
        value={end}
        onChange={(d) => {
          if (!d) return onChange([start, null]);

          const newEnd = start && isAfter(start, d) ? addHours(start, 1) : d;
          onChange([start, newEnd]);
        }}
        minDate={start ?? undefined}
        placeholder="end date"
        includeTime={includeTime}
      />
    </div>
  );
};

interface SingleDatePickerProps {
  value: Date | null;
  onChange: (d: Date | null) => void;
  placeholder: string;
  includeTime: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * A single date and time picker
 */
const SingleDatePicker = (props: SingleDatePickerProps) => {
  const { onChange, includeTime } = props;
  return (
    <SingleContainer>
      <StyledDateInput
        {...props}
        // common props
        showActionsBar
        canClearSelection
        formatDate={(date) =>
          format(date, includeTime ? "yyyy MMM dd HH:mm" : "yyyy MMM dd")
        }
        parseDate={(str) => new Date(str)}
        timePrecision={includeTime ? TimePrecision.MINUTE : undefined}
        dayPickerProps={{
          firstDayOfWeek: 1,
        }}
      />
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => onChange(null)}
      />
    </SingleContainer>
  );
};

const SingleContainer = styled.div`
  display: flex;
`;

const StyledDateInput = styled(DateInput)`
  .DayPicker-Day--today {
    &,
    &:hover {
      color: hsl(352, 98%, 54%) !important;
    }
  }
  .DayPicker-Day--selected {
    &,
    &:hover {
      color: white !important;
    }
  }
`;
