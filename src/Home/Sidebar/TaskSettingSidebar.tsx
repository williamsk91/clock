import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  HighlightOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import styled from "styled-components";

import { parseDate } from "../../components/datetime";
import { Error } from "../../components/flow/Error";
import { Loading } from "../../components/flow/Loading";
import { routes } from "../../components/route";
import { ColorSelect } from "../../components/Settings/ColorSelect";
import { DatePicker } from "../../components/Settings/DatePicker";
import { RepeatSelect } from "../../components/Settings/RepeatSelect";
import { Spacer } from "../../components/Spacer";
import { Task } from "../../components/Task";
import { demuxUpdateTask } from "../../components/utils";
import {
  Task as TaskType,
  UpdateTaskInput,
  useTaskQuery,
} from "../../graphql/generated";

interface DataProps {
  updateTask: (uti: UpdateTaskInput) => void;
}

/**
 * Query task data and pass to `TaskSidebar`.
 */
export const TaskSidebarWithData = (props: DataProps) => {
  const { updateTask } = props;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data, loading, error } = useTaskQuery({
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <TaskSettingSidebar
      task={data.task}
      updateTask={updateTask}
      goBack={() => history.push(routes.home.index)}
    />
  );
};

interface Props {
  task: TaskType;
  updateTask: (uti: UpdateTaskInput) => void;

  goBack: () => void;
}

/**
 * Setting for a task
 */
export const TaskSettingSidebar = (props: Props) => {
  const { task, updateTask } = props;

  const { includeTime, color, repeat } = task;
  const start = parseDate(task.start);
  const end = parseDate(task.end);

  const {
    updateDates,
    setIncludeTime,
    updateRepeat,
    updateColor,
  } = useMemo(() => demuxUpdateTask(task, updateTask), [task, updateTask]);

  return (
    <div>
      <Spacer spacing="60" />
      <Task
        listId="listId"
        listColor={null}
        onClickTask={() => console.log("click")}
        updateTask={updateTask}
        {...task}
      />
      <Spacer spacing="48" />

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

      <Spacer spacing="24" />

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
          <Spacer spacing="24" />
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

      <Spacer spacing="24" />

      <Section>
        <IconContainer>
          <HighlightOutlined />
        </IconContainer>
        <ColorSelect activeColor={color} updateColor={updateColor} />
      </Section>
    </div>
  );
};

const Section = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 12px;
`;

const IconContainer = styled.div`
  font-size: 24px;
`;

const IncludeTimeRow = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
