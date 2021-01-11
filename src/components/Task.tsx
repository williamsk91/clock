import { FC, useMemo } from "react";
import {
  BorderOutlined,
  CheckSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

import { Task as TaskProps, UpdateTaskInput } from "../graphql/generated";
import { EventColor, defaultEventColor, eventColors } from "./Calendar/styles";
import { formatDatetime, parseDate } from "./datetime";
import { Text } from "./Text";
import { demuxUpdateTask } from "./utils/task";

interface IProp extends TaskProps {
  listId: string;
  listColor: EventColor | null;

  updateTask: (uti: UpdateTaskInput) => void;

  onClickSetting?: (id: string) => void;
}

/**
 * A single task
 */
export const Task: FC<IProp> = (props) => {
  const {
    listColor,
    id,
    done,
    title,
    includeTime,
    updateTask,
    repeat,
    color,
    onClickSetting,
  } = props;
  const start = parseDate(props.start);
  const end = parseDate(props.end);

  // mutations
  const { setDone, setTitle } = useMemo(() => {
    const task: TaskProps = { ...props };
    return demuxUpdateTask(task, updateTask);
  }, [props, updateTask]);
  const updateDone = () => setDone(done ? null : new Date().toISOString());

  /** How many action buttons are there */
  const actionCount = onClickSetting ? 2 : 1;

  return (
    <Container>
      <Banner color={listColor ?? defaultEventColor} />
      <TaskContainer
        actionCount={actionCount}
        color={(color as EventColor | null) ?? defaultEventColor}
      >
        <div>
          <TitleInput
            placeholder="title"
            color={(color as EventColor | null) ?? defaultEventColor}
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
        {onClickSetting && (
          <ActionButton
            icon={<SettingIcon />}
            type="text"
            onClick={() => onClickSetting(id)}
          />
        )}
        <ActionButton
          icon={done ? <CheckedIcon /> : <UncheckedIcon />}
          done={done ? true : undefined}
          type="text"
          onClick={updateDone}
        />
      </TaskContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 12px auto;
  grid-gap: 3px;
`;

const Banner = styled.div<{ color: EventColor }>`
  width: 12px;
  height: 48px;

  background: ${(p) => eventColors[p.color]};
`;

const TaskContainer = styled.div<{ actionCount: number; color: EventColor }>`
  height: 48px;

  /* 1px larger than calendar's events because this is including border */
  padding: 4px 0 4px 9px;

  display: grid;
  grid-template-columns: auto ${(p) => `repeat(${p.actionCount}, 33px)`};
  grid-gap: 12px;
  align-items: center;

  background: ${(p) => eventColors[p.color]};
`;

const TitleInput = styled.input<{ color: EventColor }>`
  width: 100%;
  border: 0;

  padding: 0;
  margin-bottom: 1px;

  font-size: 16px;

  background: ${(p) => eventColors[p.color]};
  color: white;

  ::placeholder {
    color: white;
    opacity: 0.7;
  }

  :focus {
    outline: none;
  }
`;

export const TimeText = styled(Text.Sub)`
  color: white;
  font-size: 12px;
`;

const ActionButton = styled(Button)<{ done?: boolean }>`
  width: 24px;
  height: 24px;

  margin-top: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  :hover,
  :focus,
  :active {
    color: white;
  }

  transition: opacity 0.1s ease-in;
  opacity: ${(p) => (p.done ? 100 : 0)};
  ${Container}:hover & {
    opacity: 100;
  }
`;

const CheckedIcon = styled(CheckSquareOutlined)`
  font-size: 24px;
`;

const UncheckedIcon = styled(BorderOutlined)`
  font-size: 24px;
`;

const SettingIcon = styled(SettingOutlined)`
  font-size: 24px;
`;
