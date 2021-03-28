import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import { DateRange } from "@blueprintjs/datetime";
import { addHours, isAfter, isBefore } from "date-fns";

import { DatePicker } from "../DatePicker";
import { Spacer } from "../Spacer";

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
export const DateTimeRangePicker = (props: Props) => {
  const { value, onChange, includeTime } = props;

  const start = value[0];
  const end = value[1];
  const format = includeTime ? "yyyy MMM dd HH:mm" : "yyyy MMM dd";
  return (
    <div>
      <DatePicker
        value={start}
        onChange={(d) => {
          if (!d) return onChange([null, end]);

          const newStart = end && isBefore(end, d) ? addHours(end, -1) : d;
          onChange([newStart, end]);
        }}
        maxDate={end ?? undefined}
        placeholder="start date"
        includeTime={includeTime}
        format={format}
      />
      <Spacer spacing="6" />
      <DatePicker
        value={end}
        onChange={(d) => {
          if (!d) return onChange([start, null]);

          const newEnd = start && isAfter(start, d) ? addHours(start, 1) : d;
          onChange([start, newEnd]);
        }}
        minDate={start ?? undefined}
        placeholder="end date"
        includeTime={includeTime}
        format={format}
      />
    </div>
  );
};
