import styled from "styled-components";

import { EventColor, eventColors } from "../Calendar/styles";
import { Spacer } from "../Spacer";
import { Text } from "../Text";

export interface ListTooltipTask {
  color: EventColor | null;
  hours: number;
}

interface Props {
  listTitle: string;
  tasks: {
    [key: string]: ListTooltipTask;
  };
}

/**
 * List tooltip showing list title and TOP 3 most time consuming tasks
 */
export const ListTooltip = (props: Props) => {
  const { listTitle, tasks } = props;

  const sortedData = Object.entries(tasks).sort(
    ([_a, a], [_b, b]) => a.hours - b.hours
  );
  const topSortedData = sortedData.slice(0, 3);
  return (
    <Container>
      <ListTitle>{listTitle}</ListTitle>
      <Spacer spacing="12" />
      {topSortedData.map(([key, value]) => (
        <TaskRow title={key} {...value} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 240px;
`;

const ListTitle = styled(Text.SubTitle)`
  text-align: center;
`;

interface TaskRowProps {
  title: string;
  color: EventColor | null;
  hours: number;
}

const TaskRow = (props: TaskRowProps) => {
  return (
    <TaskRowContainer>
      <ColorBlock color={props.color || "blue"} />
      <div>{props.title}</div>
      <div>{props.hours} hrs</div>
    </TaskRowContainer>
  );
};

const TaskRowContainer = styled.div`
  display: grid;
  grid-template-columns: 12px 2fr 1fr;
  grid-gap: 12px;
  align-items: center;
`;

const ColorBlock = styled.div<{ color: EventColor }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${(p) => eventColors[p.color]};
`;
