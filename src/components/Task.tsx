import {
  BorderOutlined,
  CalendarOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";
import { Color, colors } from "../styles/colors";
import React, { FC, useState } from "react";

import { DatePicker } from "./DatePicker";
import { IconButton } from "./IconButton";
import { Spacer } from "./Spacer";
import { Task as TaskProps } from "../graphql/generated";
import { Text } from "./Text";
import { formatDatetime } from "./datetime";
import styled from "styled-components";

interface IProp extends TaskProps {
  setDone: (d: boolean) => void;
  setStart: (d: Date | null) => void;
  setEnd: (d: Date | null) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const {
    done,
    setDone,
    title,
    setTitle,
    start,
    end,
    includeTime,
    setStart,
    setEnd,
    setIncludeTime
  } = props;

  const [isSettingDate, setIsSettingDate] = useState(false);

  const updateDone = () => setDone(!done);

  return (
    <Container>
      <TaskContainer>
        <Banner color="red" />
        <div>
          <Input
            done={done}
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.ctrlKey && e.keyCode === 13) {
                updateDone();
              }
            }}
          />
          {start && (
            <Text.Sub>
              {formatDatetime(start, end ?? undefined, includeTime)}
            </Text.Sub>
          )}
        </div>
        <Actions>
          <IconButton
            type="link"
            onClick={updateDone}
            icon={done ? <CheckSquareOutlined /> : <BorderOutlined />}
          />
          <IconButton
            type="link"
            onClick={() => setIsSettingDate(isd => !isd)}
            icon={<CalendarOutlined />}
          />
        </Actions>
      </TaskContainer>
      {isSettingDate && (
        <>
          <Spacer spacing="1" />
          <DatePicker
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            includeTime={includeTime}
            setIncludeTime={setIncludeTime}
          />
          <Spacer spacing="1" />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-width: 250px;

  display: flex;
  flex-flow: column;
`;

const TaskContainer = styled.div`
  height: 48px;

  display: grid;
  grid-template-columns: 3px auto 64px;
  align-items: center;
  grid-gap: 6px;

  background: white;
`;

const Banner = styled.div<{ color: Color }>`
  width: 3px;
  height: 42px;

  background: ${p => colors[p.color]};
`;

const Input = styled.input<{ done: boolean }>`
  border: 0;

  text-decoration: ${p => (p.done ? "line-through" : "initials")};
  color: ${p => (p.done ? p.theme.text.disabled : p.theme.text.main)};

  &:focus {
    outline: none;
  }
`;

const Actions = styled.div`
  align-self: start;
  display: grid;
  grid-auto-flow: column;
`;
