import React from "react";
import { useHistory } from "react-router-dom";

import { NewCalendarTask } from "../../components/NewCalendarTask";

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
      onCancel={() => history.push("/")}
      onConfirm={createTask}
    />
  );
};
