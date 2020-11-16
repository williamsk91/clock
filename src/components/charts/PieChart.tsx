import React from "react";
import { PieDatum, ResponsivePie } from "@nivo/pie";
import { differenceInMinutes } from "date-fns";
import styled from "styled-components";

import { List } from "../../graphql/generated";

interface Datum extends PieDatum {
  title: string;
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
        padAngle={2}
        sortByValue
        innerRadius={0.4}
        cornerRadius={6}
        colors={{ scheme: "nivo" }}
        radialLabel={(d) => d.title as string}
        radialLabelsSkipAngle={10}
        radialLabelsLinkStrokeWidth={2}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        isInteractive={false}
        margin={{ top: 40, bottom: 40, left: 80, right: 80 }}
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
 * Converts lists into data for PieChart
 */
export const listsToPieData = (lists: List[]): Datum[] =>
  lists.map(listToPieDatum).filter((pd) => pd.value > 0);

const listToPieDatum = (list: List): Datum => ({
  id: list.id,
  value: listTaskHr(list),
  title: list.title,
});

/**
 * Get the total minutes from all tasks of a list
 */
const listTaskHr = (list: List): number =>
  list.tasks.reduce((total, t) => {
    if (t.end && t.start)
      return total + differenceInMinutes(new Date(t.end), new Date(t.start));
    return total;
  }, 0);
