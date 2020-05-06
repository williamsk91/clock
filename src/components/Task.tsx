import {
  BorderOutlined,
  CalendarOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";
import { Color, colors } from "../styles/colors";
import React, { FC, useMemo, useState } from "react";
import { Task as TaskProps, UpdateTaskInput } from "../graphql/generated";
import { formatDatetime, parseDate } from "./datetime";

import { DatePicker } from "./DatePicker";
import { IconButton } from "./IconButton";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import styled from "styled-components";

interface IProp extends TaskProps {
  updateTask: (uti: UpdateTaskInput) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = props => {
  const { done, title, includeTime, updateTask } = props;
  const start = parseDate(props.start);
  const end = parseDate(props.end);

  const task: TaskProps = { ...props };
  const { setDone, updateDates, setTitle, setIncludeTime } = useMemo(
    () => demuxUpdateTask(task, updateTask),
    [task, updateTask]
  );

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
          <Spacer spacing="2" />
          <DatePickerContainer>
            <DatePicker
              start={start}
              end={end}
              updateDates={updateDates}
              includeTime={includeTime}
              setIncludeTime={setIncludeTime}
            />
          </DatePickerContainer>
        </>
      )}
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

const DatePickerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

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

// ------------------------- Helper Functions -------------------------
const demuxUpdateTask = (
  task: TaskProps,
  updateTask: (uti: UpdateTaskInput) => void
): {
  setDone: (d: boolean) => void;
  updateDates: (dates: [Date | null, Date | null]) => void;
  setIncludeTime: (it: boolean) => void;
  setTitle: (t: string) => void;
} => {
  delete task.__typename;
  return {
    setDone: (d: boolean) => updateTask({ ...task, done: d }),
    updateDates: (dates: [Date | null, Date | null]) =>
      updateTask({
        ...task,
        start: dates[0]?.toISOString() ?? null,
        end: dates[1]?.toISOString() ?? null
      }),
    setIncludeTime: (it: boolean) => updateTask({ ...task, includeTime: it }),
    setTitle: (t: string) => updateTask({ ...task, title: t })
  };
};
