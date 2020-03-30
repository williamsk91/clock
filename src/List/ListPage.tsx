import React, { useMemo } from "react";
import { Title, TitleType } from "../components/Title";

import { ITask } from "../components/types";
import { Layout } from "../styles/layout";
import { List } from "../graphql/generatedGraphql";
import { Spacer } from "../components/Spacer";
import { Task } from "../components/Task";

interface Props {
  title: string;
  tasks: ITask[];
  updateTask: (id: string, t: ITask) => void;

  userList: Pick<List, "id" | "title">[];
}

export const ListPage = (props: Props) => {
  const { title, tasks, updateTask, userList } = props;

  const taskList = useMemo(
    () =>
      tasks.map(t => (
        <Task
          {...t}
          setDone={done => updateTask(t.id, { ...t, done })}
          setTitle={title => updateTask(t.id, { ...t, title })}
          setStart={start => updateTask(t.id, { ...t, start })}
        />
      )),
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
