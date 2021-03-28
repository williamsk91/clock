import { PieDatum, ResponsivePie } from "@nivo/pie";
import { differenceInMinutes, endOfWeek, startOfWeek } from "date-fns";
import styled from "styled-components";

import { List } from "../../graphql/generated";
import { EventColor, defaultEventColor, eventColors } from "../Calendar/styles";
import { repeatToRRule } from "../datetime";
import { chartTheme } from "./theme";

interface Datum extends PieDatum {
  title: string;
  color: string;
}

interface Props {
  data: Datum[];
  className?: string;
}

/**
 * Pie chart
 */
export const PieChart = (props: Props) => {
  const { data, className } = props;

  return (
    <Container className={className}>
      <ResponsivePie
        data={data}
        /**
         * Radial labels
         */
        radialLabel={(d) => d.title as string}
        radialLabelsSkipAngle={10}
        radialLabelsLinkStrokeWidth={2}
        radialLabelsLinkColor={{ from: "color" }}
        /**
         * Slice labels
         */
        slicesLabelsTextColor="white"
        /**
         * Style
         */
        theme={chartTheme}
        padAngle={2}
        innerRadius={0.4}
        cornerRadius={6}
        sortByValue
        isInteractive={false}
        colors={(d) => d.color as string}
        margin={{ top: 40, bottom: 40, left: 80, right: 80 }}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 360px;
`;

/**
 * Converts lists into data for PieChart
 */
export const listsToPieData = (lists: List[]): Datum[] =>
  lists.map(listToPieDatum).filter((pd) => pd.value > 0);

const listToPieDatum = (list: List): Datum => ({
  id: list.id,
  value: listTaskHr(list),
  title: list.title,
  color: eventColors[(list.color as EventColor) || defaultEventColor],
});

/**
 * Get the total minutes from all tasks of a list
 */
const listTaskHr = (list: List): number =>
  list.tasks.reduce((total, t) => {
    if (!t.start || !t.end) return total;

    const duration = differenceInMinutes(new Date(t.end), new Date(t.start));

    if (t.repeat) {
      const rrule = repeatToRRule(t.repeat);
      const today = Date.now();
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = endOfWeek(today, { weekStartsOn: 1 });
      const occurences = rrule.between(start, end).length;
      return total + occurences * duration;
    }

    return total + duration;
  }, 0);
