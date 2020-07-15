import React, { FC, useMemo } from "react";
import {
  BorderOutlined,
  CheckSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

import { Task as TaskProps, UpdateTaskInput } from "../graphql/generated";
import { defaultEventColor } from "./Calendar/styles";
import { formatDatetime, parseDate } from "./datetime";
import { Text } from "./Text";
import { demuxUpdateTask } from "./utils";

interface IProp extends TaskProps {
  updateTask: (uti: UpdateTaskInput) => void;

  goTask: (id: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = (props) => {
  const {
    id,
    done,
    title,
    includeTime,
    updateTask,
    repeat,
    color,
    goTask,
  } = props;
  const start = parseDate(props.start);
  const end = parseDate(props.end);

  const task: TaskProps = { ...props };
  const { setDone, setTitle } = useMemo(
    () => demuxUpdateTask(task, updateTask),
    [task, updateTask]
  );

  const updateDone = () => setDone(done ? null : new Date().toISOString());

  return (
    <Container color={color ?? defaultEventColor}>
      <div>
        <Input
          done={!!done}
          color={color ?? defaultEventColor}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.keyCode === 13) {
              updateDone();
            }
          }}
        />
        {start && (
          <TimeText>
            {formatDatetime(
              start,
              end ?? undefined,
              repeat ?? undefined,
              includeTime
            )}
          </TimeText>
        )}
      </div>
      <Actions>
        <ActionButton
          icon={done ? <CheckSquareOutlined /> : <BorderOutlined />}
          type="text"
          onClick={updateDone}
        />
        <ActionButton
          icon={<SettingOutlined />}
          type="text"
          onClick={() => goTask(id)}
        />
      </Actions>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  min-width: 250px;

  height: 48px;
  width: 100%;

  /* 1px larger than calendar's events because this is including border */
  padding: 4px 5px;
  border-radius: 3px;

  display: grid;
  grid-template-columns: auto 64px;
  align-items: center;
  grid-gap: 6px;

  background: ${(p) => p.color};
`;

const Input = styled.input<{ color: string; done: boolean }>`
  border: 0;

  padding: 0;
  margin-bottom: 1px;

  font-size: 14px;
  text-decoration: ${(p) => (p.done ? "line-through" : "initials")};

  background: ${(p) => p.color};
  color: white;

  &:focus {
    outline: none;
  }
`;

const TimeText = styled(Text.Sub)`
  color: white;
  font-size: 12px;
`;

const Actions = styled.div`
  align-self: start;
  display: grid;
  grid-auto-flow: column;

  transition: opacity 0.1s ease-in;
  opacity: 0;
  ${Container}:hover & {
    opacity: 100;
  }
`;

const ActionButton = styled(Button)`
  color: white;
  :hover {
    color: white;
  }
`;
