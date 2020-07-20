import React from "react";
import { useHistory } from "react-router-dom";

import { NewCalendarTask } from "../../components/NewCalendarTask";
import { routes } from "../../components/route";

interface Props {
  createTask: (
    title: string,
    start: Date,
    end: Date,
    includeTime: boolean
  ) => void;
}

export const NewTaskSidebar = (props: Props) => {
  const { createTask } = props;
  const history = useHistory();
  return (
    <NewCalendarTask
      onCancel={() => history.push(routes.home.index)}
      onConfirm={createTask}
    />
  );
};
