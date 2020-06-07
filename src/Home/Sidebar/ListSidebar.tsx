import React from "react";
import { useHistory } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import styled from "styled-components";

import { Spacer } from "../../components/Spacer";
import { TaskList } from "../../components/TaskList";
import {
  Task,
  TaskReorderInput,
  UpdateTaskInput
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
    <div>
      <div>
        <Spacer spacing="12" />
        <Button
          onClick={() => history.push("/setting")}
          type="default"
          icon={<SettingOutlined />}
        >
          setting
        </Button>
        <Spacer spacing="12" />
        <Today />
        <Spacer spacing="24" />
      </div>
      <TaskList
        tasks={tasks.filter(isNotDoneP)}
        createTask={createTask}
        updateTask={updateTask}
        taskReorder={taskReorder}
        goTask={(id: string) => history.push(`task/${id}`)}
      />
    </div>
  );
};

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

// ------------------------- Helper Functions -------------------------
const isNotDoneP = (task: Task): boolean => !task.done;
