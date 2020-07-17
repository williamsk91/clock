import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React, { useMemo } from "react";
import {
  BorderOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  HighlightOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input, Switch } from "antd";
import styled from "styled-components";

import { Task, UpdateTaskInput } from "../../graphql/generated";
import { DatePicker } from "../DatePicker";
import { parseDate } from "../datetime";
import { Spacer } from "../Spacer";
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

  const { includeTime, color, repeat, title, done } = task;
  const start = parseDate(task.start);
  const end = parseDate(task.end);

  const {
    updateDates,
    setIncludeTime,
    updateRepeat,
    updateColor,
    setTitle,
    setDone,
  } = useMemo(() => demuxUpdateTask(task, updateTask), [task, updateTask]);

  return (
    <Container>
      <ActionButtons>
        <Button onClick={goBack} icon={<CloseOutlined />} type="text" />
        <Button
          icon={done ? <CheckSquareOutlined /> : <BorderOutlined />}
          onClick={() => {
            setDone(new Date().toISOString());
            goBack();
          }}
          type="text"
        />
      </ActionButtons>

      <Divider />

      <Title
        value={title}
        autoSize={{ minRows: 1, maxRows: 3 }}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <Divider />

      <Section>
        <IconContainer>
          <ClockCircleOutlined />
        </IconContainer>
        <IncludeTimeRow>
          <div>Include Time</div>
          <Switch
            size="small"
            checked={includeTime}
            onChange={(checked) => setIncludeTime(checked)}
          />
        </IncludeTimeRow>
      </Section>

      <Spacer spacing="12" />

      <Section>
        <IconContainer>
          <CalendarOutlined />
        </IconContainer>
        <DatePicker
          value={[start, end]}
          onChange={([newStart, newEnd]) => updateDates([newStart, newEnd])}
          includeTime={includeTime}
        />
      </Section>

      {start && (
        <>
          <Spacer spacing="12" />
          <Section>
            <IconContainer>
              <RetweetOutlined />
            </IconContainer>
            <RepeatSelect
              start={new Date(start)}
              repeat={repeat}
              updateRepeat={updateRepeat}
            />
          </Section>
        </>
      )}

      <Divider />

      <Section>
        <IconContainer>
          <HighlightOutlined />
        </IconContainer>
        <ColorSelect activeColor={color} updateColor={updateColor} />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;

  background: #ffffff;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 6px;
`;

const IconContainer = styled.div`
  margin: 6px auto;
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
