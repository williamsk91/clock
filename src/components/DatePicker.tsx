import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";

import { Button } from "antd";
import React from "react";
import { Switch } from "@blueprintjs/core";
import styled from "styled-components";

interface Props {
  start: Date | null;
  end: Date | null;
  updateDates: (dates: [Date | null, Date | null]) => void;

  includeTime: boolean;
  setIncludeTime: (it: boolean) => void;

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
  const {
    start,
    end,
    updateDates,
    includeTime,
    setIncludeTime,
    className
  } = props;

  return (
    <Container className={className}>
      <DateRangePicker
        value={[start, end]}
        onChange={updateDates}
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
      <PaddedSwitch
        checked={includeTime}
        label="Include Time"
        onChange={e => setIncludeTime(e.currentTarget.checked)}
        alignIndicator="right"
      />
      {(start || end) && (
        <Button type="link" danger onClick={() => updateDates([null, null])}>
          remove date
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 6px 0;

  background: #ffffff;
`;

const PaddedSwitch = styled(Switch)`
  padding: 0 15px;
`;
