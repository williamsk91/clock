import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React, { useMemo } from "react";
import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  HighlightOutlined,
  LeftOutlined,
  RetweetOutlined,
  WarningOutlined
} from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import { isBefore } from "date-fns";
import styled from "styled-components";

import { Task, UpdateTaskInput } from "../../graphql/generated";
import { DatePicker } from "../DatePicker";
import { parseDate } from "../datetime";
import { demuxUpdateTask } from "../utils";
import { ColorSelect } from "./ColorSelect";
import { RepeatSelect } from "./RepeatSelect";

interface Props {
  task: Task;
  updateTask: (uti: UpdateTaskInput) => void;

  goBack: () => void;
}

/**
 * Setting for a task
 */
export const TaskSetting = (props: Props) => {
  const { task, updateTask, goBack } = props;
  const { includeTime, color, repeat, title } = task;
  const start = parseDate(task.start);
  const end = parseDate(task.end);

  const {
    updateDates,
    setIncludeTime,
    updateRepeat,
    updateColor,
    setTitle,
    setDone
  } = useMemo(() => demuxUpdateTask(task, updateTask), [task, updateTask]);

  return (
    <Container>
      <IconContainer onClick={goBack}>
        <LeftOutlined />
      </IconContainer>
      <Title
        value={title}
        autoSize={{ minRows: 1, maxRows: 3 }}
        onChange={e => setTitle(e.currentTarget.value)}
      />

      <IconContainer>
        <CheckOutlined />
      </IconContainer>
      <div>
        <Button
          onClick={() => {
            setDone(new Date().toISOString());
            goBack();
          }}
          type="link"
        >
          Mark Completed
        </Button>
      </div>

      <IconContainer>
        <CalendarOutlined />
      </IconContainer>
      <DatePicker
        value={[start, end]}
        onChange={([newStart, newEnd]) => {
          // end is earlier than start restriction violated
          if (newStart && newEnd && isBefore(newEnd, newStart)) return;
          updateDates([newStart, newEnd]);
        }}
        includeTime={includeTime}
      />

      <IconContainer>
        <ClockCircleOutlined />
      </IconContainer>
      <IncludeTimeRow>
        <div>Include Time</div>
        <Switch
          size="small"
          checked={includeTime}
          onChange={checked => setIncludeTime(checked)}
        />
      </IncludeTimeRow>

      {start && (
        <>
          <IconContainer>
            <RetweetOutlined />
          </IconContainer>
          <RepeatSelect
            start={new Date(start)}
            repeat={repeat}
            updateRepeat={updateRepeat}
          />
        </>
      )}

      <IconContainer>
        <HighlightOutlined />
      </IconContainer>
      <ColorSelect activeColor={color} updateColor={updateColor} />

      {(start || end) && (
        <>
          <IconContainer>
            <WarningOutlined />
          </IconContainer>
          <span>
            <ClearDateButton
              type="link"
              danger
              onClick={() => updateDates([null, null])}
            >
              Clear date
            </ClearDateButton>
          </span>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow: hidden auto;

  padding: 24px;

  display: grid;
  grid-template-columns: 24px auto;
  grid-template-rows: min-content;
  grid-auto-rows: min-content;
  grid-gap: 24px 6px;

  background: #ffffff;
`;

const IconContainer = styled.div<{ onClick?: () => void }>`
  margin: 6px auto;

  :hover {
    cursor: ${p => (p.onClick ? "pointer" : "initial")};
  }
`;

const Title = styled(Input.TextArea)`
  border: none;
`;

const IncludeTimeRow = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearDateButton = styled(Button)`
  padding: 0;
`;
