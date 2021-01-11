import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import emptyListImg from "../../assets/undraw_cup_of_tea_6nqg.svg";
import {
  Error,
  List,
  Loading,
  NewItem,
  Spacer,
  Tasks,
  Text,
  homeListSettingRoute,
  homeTaskSettingRoute,
  taskIsNotDeletedP,
  taskIsNotDoneP,
} from "../../components";
import {
  useCreateTask,
  useTaskReorder,
  useUpdateTask,
} from "../../data/mutation/task";
import {
  List as ListType,
  TaskReorderInput,
  UpdateTaskInput,
  useListQuery,
} from "../../graphql/generated";

/**
 * Query task data and pass to `ListSidebar`
 */
export const ListSidebarWithData = () => {
  const { listId } = useParams<{ listId: string }>();
  const history = useHistory();

  const { data, loading, error } = useListQuery({ variables: { listId } });

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const taskReorder = useTaskReorder();

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  const onClickListSetting = (listId: string) => {
    history.push(homeListSettingRoute(listId));
  };

  const onClickTaskSetting = (taskId: string) => {
    history.push(homeTaskSettingRoute(listId, taskId));
  };

  return (
    <ListSidebar
      list={data.list}
      createTask={(t: string) =>
        createTask(listId, {
          title: t,
          done: null,
          start: null,
          end: null,
          includeTime: false,
          color: null,
          repeat: null,
        })
      }
      updateTask={updateTask}
      taskReorder={taskReorder}
      onClickListSetting={onClickListSetting}
      onClickTaskSetting={onClickTaskSetting}
    />
  );
};

interface Props {
  list: ListType;

  createTask: (t: string) => void;
  updateTask: (uti: UpdateTaskInput) => void;
  taskReorder: (tasks: TaskReorderInput[]) => void;

  onClickListSetting: (id: string) => void;
  onClickTaskSetting: (id: string) => void;
}

/**
 * Displays:
 *  1. Current list info
 *  2. New task input
 *  3. Uncompleted tasks
 */
export const ListSidebar = (props: Props) => {
  const {
    list,
    createTask,
    updateTask,
    taskReorder,
    onClickListSetting,
    onClickTaskSetting,
  } = props;

  const notDoneTask = list.tasks
    .filter(taskIsNotDeletedP)
    .filter(taskIsNotDoneP);

  return (
    <Container>
      <Spacer spacing="60" />
      <List {...list} onClickSetting={onClickListSetting} />
      <Spacer spacing="48" />
      <NewItem placeholder="Add a new task" createItem={createTask} />
      <Spacer spacing="12" />
      {notDoneTask.length === 0 ? (
        <EmptyList />
      ) : (
        <Tasks
          list={list}
          tasks={notDoneTask}
          updateTask={updateTask}
          taskReorder={taskReorder}
          onClickSetting={onClickTaskSetting}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const EmptyList = () => (
  <EmptyListContainer>
    <EmptyListImg src={emptyListImg} />
    <Spacer spacing="12" />
    <Text.Message>
      All tasks completed{" "}
      <span role="img" aria-label="confetti emoji">
        🎉
      </span>
    </Text.Message>
  </EmptyListContainer>
);

const EmptyListContainer = styled.div`
  height: 100%;
  margin: 60px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyListImg = styled.img`
  max-width: 180px;
`;
