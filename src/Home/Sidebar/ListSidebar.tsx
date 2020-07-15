import React from "react";
import { useHistory } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import styled from "styled-components";

import { NewTask } from "../../components/NewTask";
import { Spacer } from "../../components/Spacer";
import { isNotDoneP } from "../../components/taskFilter";
import { TaskList } from "../../components/TaskList";
import {
  Task,
  TaskReorderInput,
  UpdateTaskInput,
} from "../../graphql/generated";

interface Props {
  tasks: Task[];
  createTask: (t: string) => void;
  updateTask: (uti: UpdateTaskInput) => void;
  taskReorder: (tasks: TaskReorderInput[]) => void;
}

export const ListSidebar = (props: Props) => {
  const { tasks, createTask, updateTask, taskReorder } = props;

  const history = useHistory();

  return (
    <Container>
      <div>
        <Button
          onClick={() => history.push("/setting")}
          type="text"
          icon={<SettingOutlined />}
        >
          setting
        </Button>
        <Spacer spacing="12" />
        <Today />
        <Spacer spacing="24" />
        <NewTask createTask={createTask} />
        <Spacer spacing="12" />
      </div>
      <TaskList
        tasks={tasks.filter(isNotDoneP)}
        updateTask={updateTask}
        taskReorder={taskReorder}
        goTask={(id: string) => history.push(`task/${id}`)}
      />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 12px;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

/**
 * Displays today as big heading
 */
const Today = () => {
  return (
    <>
      <TodayContainer>{format(new Date(), "dd")}</TodayContainer>
      <TodayContainer>{format(new Date(), "MMMM")}</TodayContainer>
    </>
  );
};

const TodayContainer = styled.div`
  font-size: 64px;
  color: rgba(55, 53, 47, 0.85);
  line-height: 1;
`;
