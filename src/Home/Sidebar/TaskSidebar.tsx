import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { Error } from "../../components/flow/Error";
import { Loading } from "../../components/flow/Loading";
import { TaskSetting } from "../../components/TaskSetting";
import { Task, UpdateTaskInput, useTaskQuery } from "../../graphql/generated";

interface Props {
  updateTask: (uti: UpdateTaskInput) => void;
}

/**
 * Query task data and pass to `TaskSidebarWithData`.
 */
export const TaskSidebar = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useTaskQuery({
    variables: { id }
  });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return <TaskSidebarWithData task={data.task} updateTask={props.updateTask} />;
};

interface WithDataProps extends Props {
  task: Task;
}

/**
 * Show a setting sidebar for a task.
 */
const TaskSidebarWithData = (props: WithDataProps) => {
  const { task, updateTask } = props;
  const history = useHistory();

  return (
    <Container>
      <TaskSetting
        task={task}
        updateTask={updateTask}
        goBack={() => history.push("/")}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 24px 0;
`;
