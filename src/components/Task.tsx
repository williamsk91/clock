import React, { FC, useMemo } from "react";
import {
  BorderOutlined,
  CheckSquareOutlined,
  SettingOutlined
} from "@ant-design/icons";
import styled from "styled-components";

import { Task as TaskProps, UpdateTaskInput } from "../graphql/generated";
import { defaultEventColor } from "./Calendar/styles";
import { formatDatetime, parseDate } from "./datetime";
import { IconButton } from "./IconButton";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { demuxUpdateTask } from "./utils";

interface IProp extends TaskProps {
  updateTask: (uti: UpdateTaskInput) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, title, includeTime, updateTask, repeat, color } = props;
  const start = parseDate(props.start);
  const end = parseDate(props.end);

  const task: TaskProps = { ...props };
  const { setDone, setTitle } = useMemo(
    () => demuxUpdateTask(task, updateTask),
    [task, updateTask]
  );

  const updateDone = () => setDone(done ? null : new Date().toISOString());

  return (
    <Container>
      <TaskContainer>
        <Banner color={color ?? defaultEventColor} />
        <div>
          <Input
            done={!!done}
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
              {formatDatetime(
                start,
                end ?? undefined,
                repeat ?? undefined,
                includeTime
              )}
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
            // onClick={() => setIsSettingDate(isd => !isd)}
            icon={<SettingOutlined />}
          />
        </Actions>
      </TaskContainer>
      <Spacer spacing="6" />
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
  width: 100%;

  display: grid;
  grid-template-columns: 3px auto 64px;
  align-items: center;
  grid-gap: 6px;

  background: white;
`;

const Banner = styled.div<{ color: string }>`
  width: 3px;
  height: 42px;

  background: ${p => p.color};
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
