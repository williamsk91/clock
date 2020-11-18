import React from "react";
import { PieDatum, ResponsivePie } from "@nivo/pie";
import { differenceInMinutes } from "date-fns";
import styled from "styled-components";

import { List } from "../../graphql/generated";
import { EventColor, defaultEventColor, eventColors } from "../Calendar/styles";
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
    if (t.end && t.start)
      return total + differenceInMinutes(new Date(t.end), new Date(t.start));
    return total;
  }, 0);
