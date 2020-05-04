import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";

import React from "react";
import { Switch } from "@blueprintjs/core";
import styled from "styled-components";

interface Props {
  start: Date | null;
  setStart: (d: Date | null) => void;

  end: Date | null;
  setEnd: (d: Date | null) => void;

  includeTime: boolean;
  setIncludeTime: (it: boolean) => void;

  /**
   * This is to extend the container style using
   * Styled-Components
   */
  className?: string;
}

export const DatePicker = (props: Props) => {
  const {
    start,
    setStart,
    end,
    setEnd,
    includeTime,
    setIncludeTime,
    className
  } = props;

  return (
    <Container className={className}>
      <DateRangePicker
        value={[start, end]}
        onChange={([newStart, newEnd]) => {
          setStart(newStart);
          setEnd(newEnd);
        }}
        timePickerProps={
          includeTime
            ? {
                showArrowButtons: true,
                precision: TimePrecision.MINUTE
              }
            : undefined
        }
        shortcuts={false}
        allowSingleDayRange
        singleMonthOnly
      />
      <Switch
        checked={includeTime}
        label="Include Time"
        onChange={e => setIncludeTime(e.currentTarget.checked)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
`;
