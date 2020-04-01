import {
  List,
  Task as TaskProps,
  UpdateTaskInput
} from "../graphql/generatedGraphql";
import React, { useMemo } from "react";
import { Title, TitleType } from "../components/Title";

import { Layout } from "../styles/layout";
import { Spacer } from "../components/Spacer";
import { Task } from "../components/Task";

interface Props {
  title: string;
  tasks: TaskProps[];
  updateTask: (t: UpdateTaskInput) => void;

  userList: Pick<List, "id" | "title">[];
}

export const ListPage = (props: Props) => {
  const { title, tasks, updateTask, userList } = props;

  const taskList = useMemo(
    () =>
      tasks.map(t => {
        delete t.__typename;
        return (
          <Task
            key={t.id}
            {...t}
            setDone={done => updateTask({ ...t, done })}
            setTitle={title => updateTask({ ...t, title })}
            setStart={start => updateTask({ ...t, start })}
          />
        );
      }),
    [tasks, updateTask]
  );

  const submenu = useMemo(
    () => ({ title, items: userList.map(({ title }) => ({ title })) }),
    [title, userList]
  );

  return (
    <Layout>
      <Title type={TitleType.Lists} submenu={submenu} />
      <Spacer spacing="108" />
      {taskList}
    </Layout>
  );
};
