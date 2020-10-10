import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Calendar, Error, Loading, routes } from "../components";
import { useUpdateTask } from "../data/mutation/task";
import { useCalendarListsQuery } from "../graphql/generated";

/**
 * Query list data and pass to `Calendar`
 */
export const CalendarWithData = () => {
  const history = useHistory();

  const { data, loading, error } = useCalendarListsQuery();

  const updateTask = useUpdateTask();

  const createCalendarTask = useCallback(
    (start: Date, end: Date, includeTime: boolean) => {
      history.push(routes.home.newTask, {
        date: {
          start,
          end,
          includeTime,
        },
      });
    },
    [history]
  );

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <Calendar
      lists={data.lists}
      updateTask={updateTask}
      createTask={createCalendarTask}
    />
  );
};
