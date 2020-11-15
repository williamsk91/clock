import React from "react";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { differenceInMinutes, getDay } from "date-fns";
import styled from "styled-components";

import { List } from "../../graphql/generated";
import { sameWeekTask, taskHasDateP } from "../utils/taskFilter";

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
        margin={{ top: 40, bottom: 80 }}
        padding={0.9}
        innerPadding={6}
        borderRadius={6}
        enableLabel={false}
        enableGridY={false}
        axisBottom={{ tickSize: 0, tickPadding: 12 }}
        colors={{ scheme: "nivo" }}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Container>
  );
};

const Container = styled.div`
  min-width: 720px;
  height: 360px;
`;

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
  const dayHours = listDaysHours(list, now);
  return dayHours.map((h) => ({
    [list.title]: h,
  }));
};

/**
 * Bins list's tasks hours into different days starting from Monday
 */
const listDaysHours = (list: List, now: Date = new Date()): number[] => {
  const tasksThisWeek = list.tasks
    .filter(taskHasDateP)
    .filter((t) => sameWeekTask(t, now));

  return tasksThisWeek.reduce(
    (days, t) => {
      if (!t.start || !t.end) return days;

      const start = new Date(t.start);
      const duration = differenceInMinutes(new Date(t.end), start) / 60;
      const day = getDay(start);

      days[day] = days[day] + duration;
      return days;
    },
    [0, 0, 0, 0, 0, 0, 0]
  );
};
