import React, { useMemo } from "react";
import { format } from "date-fns";
import styled from "styled-components";

import {
  Error,
  FullPage,
  Loading,
  PieChart,
  Spacer,
  Text,
  TrackWithRoutes,
  WeekChart,
  listsToPieData,
  listsToWeekData,
} from "../components";
import { Overview } from "../components/Overview";
import {
  applyFilterOnTask,
  sameWeekTask,
  taskIsNotDoneP,
} from "../components/utils/filter";
import { List, useListsQuery } from "../graphql/generated";

export const AnalyticsRoute = () => {
  const { data, loading, error } = useListsQuery({
    variables: {
      withTasks: true,
    },
  });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return <AnalyticsPage lists={data.lists} />;
};

interface Props {
  lists: List[];
}

/**
 * Displays weekly analytics.
 *
 *  1. PieChart - percentage of hours spent on different lists
 *  2. WeekChart - hours spend on each list on each day
 */
export const AnalyticsPage = (props: Props) => {
  const { lists } = props;

  const pieData = useMemo(() => {
    const thisWeekLists = lists.map(applyFilterOnTask([sameWeekTask]));
    return listsToPieData(thisWeekLists);
  }, [lists]);
  const weekData = useMemo(() => listsToWeekData(lists), [lists]);

  const taskRemaining = calcTaskRemainingCount(lists);

  return (
    <FullPage.Container>
      <TrackWithRoutes />
      <FullPage.Content>
        <Text.Title>Weekly overview #{format(new Date(), "w")}</Text.Title>
        <Spacer spacing="24" />
        <Overview title={taskRemaining.toString()} subtitle="Tasks remaining" />
        <Spacer spacing="60" />
        <Text.Title>Hours allocation</Text.Title>
        <Spacer spacing="24" />
        <Pie data={pieData} />
        <Spacer spacing="60" />
        <Text.Title>Daily breakdown</Text.Title>
        <Spacer spacing="24" />
        <Week data={weekData} />
      </FullPage.Content>
    </FullPage.Container>
  );
};

const Pie = styled(PieChart)`
  width: 100%;

  border: 2px solid black;
  border-radius: 6px;
`;

const Week = styled(WeekChart)`
  height: 360px;
  width: 100%;

  border: 2px solid black;
  border-radius: 6px;
`;

// ------------------------- Helper Functions -------------------------

/**
 * Calculate task count remaining this week
 */
const calcTaskRemainingCount = (lists: List[]): number => {
  const thisWeekList = lists.map(
    applyFilterOnTask([taskIsNotDoneP, sameWeekTask])
  );
  const taskCount = thisWeekList.reduce((tc, l) => tc + l.tasks.length, 0);
  return taskCount;
};
