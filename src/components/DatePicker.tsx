import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React from "react";
import { Switch } from "@blueprintjs/core";
import { DateRangePicker, TimePrecision } from "@blueprintjs/datetime";
import { Button, Select } from "antd";
import { getDay, isBefore } from "date-fns";
import styled from "styled-components";

import { Repeat, RepeatInput } from "../graphql/generated";
import { RoundCheck } from "./RoundCheck";
import { Spacer } from "./Spacer";

interface Props {
  start: Date | null;
  end: Date | null;
  updateDates: (dates: [Date | null, Date | null]) => void;

  includeTime: boolean;
  setIncludeTime: (it: boolean) => void;

  repeat: Repeat | null;
  updateRepeat: (r: Repeat | null) => void;

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
    repeat,
    updateRepeat,
    className
  } = props;

  return (
    <Container className={className}>
      <StyledDateRangePicker
        value={[start, end]}
        onChange={([newStart, newEnd]) => {
          // end is earlier than start restriction violated
          if (newStart && newEnd && isBefore(newEnd, newStart)) return;
          updateDates([newStart, newEnd]);
        }}
        timePrecision={includeTime ? TimePrecision.MINUTE : undefined}
        shortcuts={false}
        allowSingleDayRange
        singleMonthOnly
      />
      <IncludeTimeSwitch
        checked={includeTime}
        label="Include Time"
        onChange={e => setIncludeTime(e.currentTarget.checked)}
        alignIndicator="right"
      />
      {start && (
        <RepeatSelect
          start={new Date(start)}
          repeat={repeat}
          updateRepeat={updateRepeat}
        />
      )}
      {(start || end) && (
        <>
          <Spacer spacing="24" />
          <Button type="link" danger onClick={() => updateDates([null, null])}>
            remove date
          </Button>
        </>
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

const IncludeTimeSwitch = styled(Switch)`
  padding: 0 15px;
`;

// ------------------------- Repeat Select -------------------------

interface RepeatSelectProps {
  start: Date;
  repeat: Repeat | null;
  updateRepeat: (r: Repeat | null) => void;
}

/**
 * A select to input to repeat task.
 */
const RepeatSelect = (props: RepeatSelectProps) => {
  const { start, repeat, updateRepeat } = props;
  return (
    <RepeatSelectContainer>
      <Select
        style={{ width: "100%" }}
        value={repeat?.freq}
        onChange={value => {
          const newRepeat: RepeatInput | null = value
            ? {
                freq: value,
                byweekday:
                  value === "weekly"
                    ? repeat?.byweekday ?? [getDay(start)]
                    : null
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
          { value: "yearly", label: "Yearly" }
        ]}
      />
      {!!repeat?.byweekday && (
        <>
          <Spacer spacing="6" />
          <WeeklySelect
            checkedWeekdays={repeat.byweekday}
            onChange={byweekday => {
              updateRepeat({ ...repeat, byweekday });
            }}
          />
        </>
      )}
    </RepeatSelectContainer>
  );
};

const RepeatSelectContainer = styled.div`
  padding: 0 15px;
  width: 100%;
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
          ? checkedWeekdays.filter(cw => cw !== weekday)
          : [...checkedWeekdays, weekday];
        onChange(newCheckedWeekdays);
      }
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
  grid-template-columns: repeat(7, 1fr);
`;
