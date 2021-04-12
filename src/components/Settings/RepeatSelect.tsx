import { Select } from "antd";
import { addYears } from "date-fns";
import styled from "styled-components";

import {
  Repeat,
  RepeatFrequency,
  UpsertRepeatInput,
} from "../../graphql/generated";
import { DatePicker } from "../DatePicker";
import { RoundCheck } from "../RoundCheck";
import { Spacer } from "../Spacer";
import { Text } from "../Text";

interface Props {
  start: Date;
  repeat: Omit<Repeat, "id"> | null;
  updateRepeat: (r: UpsertRepeatInput | null) => void;
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
            if (!value) return updateRepeat(null);

            let byweekday: string[] | null = null;
            if (value === RepeatFrequency.Weekly) {
              // date fns 0 is different from rrule 0
              // const weekday = getDay(start);
              // const startingWeekday = weekday === 0 ? 6 : weekday - 1;
              byweekday = ["MO"];
            }

            const newRepeat: UpsertRepeatInput = {
              freq: value,
              byweekday,
              end: repeat?.end ?? null,
              exclude: repeat?.exclude ?? [],
            };

            updateRepeat(newRepeat);
          }}
          placeholder="Repeat"
          allowClear
          options={[
            { value: RepeatFrequency.Daily, label: "Daily" },
            { value: RepeatFrequency.Weekly, label: "Weekly" },
            { value: RepeatFrequency.Monthly, label: "Monthly" },
            { value: RepeatFrequency.Yearly, label: "Yearly" },
          ]}
        />
      </RepeatSelectContainer>
      {repeat?.freq === RepeatFrequency.Weekly && !!repeat.byweekday && (
        <>
          <Spacer spacing="6" />
          <WeeklySelect
            checkedWeekdays={repeat.byweekday}
            onChange={(byweekday) => {
              updateRepeat({ ...repeat, byweekday });
            }}
          />
        </>
      )}
      {!!repeat && (
        <>
          <Spacer spacing="12" />
          <EndDateContainer>
            <Text.Main>Until</Text.Main>
            <DatePicker
              value={repeat.end ? new Date(repeat.end) : null}
              minDate={start}
              maxDate={addYears(start, 100)}
              onChange={(d) =>
                updateRepeat({ ...repeat, end: d?.toISOString() ?? null })
              }
              format="yyyy MMM dd"
              placeholder="forever"
            />
          </EndDateContainer>
        </>
      )}
    </div>
  );
};

const RepeatSelectContainer = styled.div`
  width: 102px;
`;

interface WeeklySelectProps {
  checkedWeekdays: string[];
  onChange: (checkedWeekdays: string[]) => void;
}

/**
 * Checkable weekday select to choose which weekday will the task repeat on.
 */
const WeeklySelect = ({ checkedWeekdays, onChange }: WeeklySelectProps) => {
  const checkProps = (weekday: string) => {
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
      <RoundCheck text="Mo" {...checkProps("MO")} />
      <RoundCheck text="Tu" {...checkProps("TU")} />
      <RoundCheck text="We" {...checkProps("WE")} />
      <RoundCheck text="Th" {...checkProps("TH")} />
      <RoundCheck text="Fr" {...checkProps("FR")} />
      <RoundCheck text="Sa" {...checkProps("SA")} />
      <RoundCheck text="Su" {...checkProps("SU")} />
    </WeeklySelectContainer>
  );
};

const WeeklySelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 30px);
  grid-gap: 6px;
`;

const EndDateContainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: auto auto;
  align-items: center;
`;
