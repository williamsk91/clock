import { Title, TitleType } from "../components/Title";

import { ITask } from "../components/types";
import { Layout } from "../styles/layout";
import React from "react";
import { Spacer } from "../components/Spacer";
import { Task } from "../components/Task";

interface Props {
  name: string;
  tasks: ITask[];
  updateTask: (id: string, t: ITask) => void;
}

export const ListPage = (props: Props) => {
  const { tasks, updateTask } = props;
  const lists = tasks.map(t => (
    <Task
      {...t}
      setDone={done => updateTask(t.id, { ...t, done })}
      setTitle={title => updateTask(t.id, { ...t, title })}
      setStart={start => updateTask(t.id, { ...t, start })}
    />
  ));
  return (
    <Layout>
      <Title type={TitleType.Lists} />
      <Spacer spacing="108" />
      {lists}
    </Layout>
  );
};

