import { CloseOutlined } from "@ant-design/icons";
import { DateInput, TimePrecision } from "@blueprintjs/datetime";
import { Button } from "antd";
import { format as formatDate } from "date-fns";
import styled from "styled-components";

interface Props {
  value: Date | null;
  onChange?: (d: Date | null) => void;
  placeholder?: string;
  includeTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format: string;
}

/**
 * A single date and time picker
 */
export const DatePicker = (props: Props) => {
  const { onChange, includeTime, format } = props;
  return (
    <SingleContainer>
      <StyledDateInput
        {...props}
        // common props
        showActionsBar
        canClearSelection
        formatDate={(date) => formatDate(date, format)}
        parseDate={(str) => new Date(str)}
        timePrecision={includeTime ? TimePrecision.MINUTE : undefined}
        dayPickerProps={{
          firstDayOfWeek: 1,
        }}
      />
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => onChange?.(null)}
      />
    </SingleContainer>
  );
};

const SingleContainer = styled.div`
  display: flex;
`;

const StyledDateInput = styled(DateInput)`
  width: 100%;
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
