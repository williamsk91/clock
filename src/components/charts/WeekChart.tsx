import React from "react";

import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { differenceInMinutes, getDay, isSameWeek } from "date-fns";
import styled from "styled-components";

import { List } from "../../graphql/generated";
import { getRandomTasks } from "../../stories/mocks";
import { taskHasDateP } from "../taskFilter";

interface Datum extends BarDatum {
  day: string;
}

interface Props {
  data: Datum[];
}

export const WeekChart = (props: Props) => {
  const { data } = props;
  console.log("data: ", data);
  return (
    <Container>
      <ResponsiveBar
        data={data}
        keys={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        indexBy="day"
        margin={{ top: 40, bottom: 80 }}
        padding={0.9}
        innerPadding={1}
        enableLabel={false}
        colors={{ scheme: "nivo" }}
        labelSkipWidth={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 360px;
`;

/**
 * Converts lists into data for WeekChart
 */
export const listsToWeekData = (
  lists: List[],
  now: Date = new Date()
): Datum[] => {
  console.log("lists: ", lists);
  // get the hours spent each day this week for each list
  const listsWeekDatum = lists.map((l) => listToWeekDatum(l, now));
  console.log("listsWeekDatum: ", listsWeekDatum);

  // combine all lists array into a single array
  const mergedListsWeekDatum = listsWeekDatum.reduce(
    (allWeekDatum, weekDatum) => {
      weekDatum.forEach((wd, i) => {
        allWeekDatum[i] = { ...allWeekDatum[i], ...wd };
      });
      return weekDatum;
    }
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
    .filter((t) => isSameWeek(new Date(t.start as string), now));

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
