import { BarDatum, BarTooltipDatum, ResponsiveBar } from "@nivo/bar";
import { differenceInMinutes, endOfWeek, getDay, startOfWeek } from "date-fns";
import styled from "styled-components";

import { List, Maybe } from "../../graphql/generated";
import { EventColor, defaultEventColor, eventColors } from "../Calendar/styles";
import { repeatToRRule } from "../datetime";
import { cycleArray } from "../utils/array";
import { sameWeekTask, taskHasDateP } from "../utils/filter";
import { ListTooltip, ListTooltipTask } from "./ListTooltip";
import { chartTheme } from "./theme";

interface Datum extends BarDatum {
  day: string;
}

interface Props {
  data: Datum[];
  className?: string;
}

/**
 * Weekly chart of multiple lists represented as stacked bar chart
 */
export const WeekChart = (props: Props) => {
  const { data, className } = props;

  const keys = Object.keys(data[0]).filter((k) => k !== "day");

  return (
    <Container className={className}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="day"
        theme={chartTheme}
        margin={{ top: 40, bottom: 80 }}
        padding={0.9}
        innerPadding={6}
        borderRadius={6}
        enableLabel={false}
        enableGridY={false}
        axisBottom={{ tickSize: 0, tickPadding: 12 }}
        colors={(d) => d.data[d.id + "Color"] as string}
        tooltip={WeekChartTooltip}
      />
    </Container>
  );
};

const Container = styled.div`
  min-width: 720px;
  height: 360px;
`;

const WeekChartTooltip = (props: BarTooltipDatum) => {
  const listTitle = props.id as string;
  const data = props.data[listTitle + "ExtraData"] as any;

  return <ListTooltip listTitle={listTitle} tasks={data} />;
};

/**
 * Converts lists into data for WeekChart
 */
export const listsToWeekData = (
  lists: List[],
  now: Date = new Date()
): Datum[] => {
  // get the hours spent each day this week for each list
  const listsWeekDatum = lists.map((l) => listToWeekDatum(l, now));

  // combine all lists array into a single array
  const mergedListsWeekDatum: Record<string, number | string>[] = [];
  listsWeekDatum.forEach((wd) =>
    wd.forEach((d, i) => {
      mergedListsWeekDatum[i] = { ...mergedListsWeekDatum[i], ...d };
    })
  );

  // adds day information
  mergedListsWeekDatum[0].day = "Mon";
  mergedListsWeekDatum[1].day = "Tue";
  mergedListsWeekDatum[2].day = "Wed";
  mergedListsWeekDatum[3].day = "Thu";
  mergedListsWeekDatum[4].day = "Fri";
  mergedListsWeekDatum[5].day = "Sat";
  mergedListsWeekDatum[6].day = "Sun";

  return mergedListsWeekDatum as Datum[];
};

const listToWeekDatum = (list: List, now: Date = new Date()): BarDatum[] => {
  const listTaskWeekBins = listTaskDayHours(list, now);
  const dayHours = listDaysHours(listTaskWeekBins);
  return listTaskWeekBins.map((w, i) => ({
    [list.title]: dayHours[i],
    [list.title + "Color"]:
      eventColors[(list.color as EventColor) || defaultEventColor],

    /**
     * list tasks and their hours
     */
    [list.title + "ExtraData"]: w as any,
  }));
};

type ListTooltipTaskDays = Record<string, ListTooltipTask>;

/**
 * Bins list's tasks hours into different days starting from Monday
 */
const listDaysHours = (taskWeekBins: ListTooltipTaskDays[]): number[] => {
  return taskWeekBins.map((t) =>
    Object.values(t).reduce(
      (totalDuration, taskDuration) => totalDuration + taskDuration.hours,
      0
    )
  );
};

/**
 * Bins list's tasks and their hours into different days starting from Monday
 */
const listTaskDayHours = (
  list: List,
  now: Date = new Date(),
  weekStartOn: number = 1
): ListTooltipTaskDays[] => {
  const tasksThisWeek = list.tasks
    .filter(taskHasDateP)
    .filter((t) => sameWeekTask(t, now));

  const weekBins = tasksThisWeek.reduce(
    (days, t) => {
      if (!t.start || !t.end) return days;

      const start = new Date(t.start as string);
      const duration =
        differenceInMinutes(new Date(t.end as string), start) / 60;

      // repeat
      if (t.repeat) {
        const rrule = repeatToRRule(t.repeat, new Date(t.start));
        const today = Date.now();
        const start = startOfWeek(today, { weekStartsOn: 1 });
        const end = endOfWeek(today, { weekStartsOn: 1 });
        const betweenDates = rrule.between(start, end);
        betweenDates.forEach((d) => {
          const day = getDay(d);
          days[day][t.title] = {
            color: t.color as Maybe<EventColor>,
            hours: duration,
          };
        });

        // handle normal
      } else {
        const day = getDay(start);
        days[day][t.title] = {
          color: t.color as Maybe<EventColor>,
          hours: duration,
        };
      }

      return days;
    },
    [{}, {}, {}, {}, {}, {}, {}] as ListTooltipTaskDays[]
  );

  return cycleArray(weekBins, -weekStartOn);
};
