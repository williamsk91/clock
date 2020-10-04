import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import emptyListImg from "../../assets/undraw_cup_of_tea_6nqg.svg";
import { List } from "../../components/List";
import { NewItem } from "../../components/NewItem";
import { homeTaskRoute } from "../../components/route";
import { Spacer } from "../../components/Spacer";
import { isNotDoneP } from "../../components/taskFilter";
import { Tasks } from "../../components/TaskList";
import { Text } from "../../components/Text";
import {
  List as ListProp,
  Task,
  TaskReorderInput,
  UpdateTaskInput,
} from "../../graphql/generated";

interface Props {
  list: ListProp;
  tasks: Task[];

  createTask: (t: string) => void;
  updateTask: (uti: UpdateTaskInput) => void;
  taskReorder: (tasks: TaskReorderInput[]) => void;
}

/**
 * Displays:
 *  1. Current list info
 *  2. New task input
 *  3. Uncompleted tasks
 */
export const TasksSidebar = (props: Props) => {
  const { list, tasks, createTask, updateTask, taskReorder } = props;
  const history = useHistory();

  const notDoneTask = tasks.filter(isNotDoneP);

  return (
    <Container>
      <Spacer spacing="60" />
      <List {...list} />
      <Spacer spacing="48" />
      <NewItem placeholder="Add a new task" createItem={createTask} />
      <Spacer spacing="12" />
      {notDoneTask.length === 0 ? (
        <EmptyList />
      ) : (
        <Tasks
          listId={list.id}
          listColor={list.color}
          tasks={notDoneTask}
          updateTask={updateTask}
          taskReorder={taskReorder}
          goTask={(id: string) => history.push(homeTaskRoute(id))}
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
