import { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import {
  Calendar,
  Error,
  Loading,
  homeTaskSettingRoute,
  routes,
} from "../components";
import { useCalendarContext } from "../components/context/CalendarContext";
import { useUpdateRepeat } from "../data/mutation/repeat";
import { useCreateTask, useUpdateTask } from "../data/mutation/task";
import { useCalendarListsQuery } from "../graphql/generated";

/**
 * Query list data and pass to `Calendar`
 */
export const CalendarWithData = () => {
  const history = useHistory();
  const match = useRouteMatch<{ listId: string }>({ path: routes.home.list });
  const { api } = useCalendarContext();

  const { data, loading, error } = useCalendarListsQuery();

  const createTask = useCreateTask();
  // Redirects to task setting on completion
  const createTaskWithRedirect = useCreateTask({
    onCompleted: (completedData) => {
      const listId = match?.params.listId ?? data?.lists[0]?.id;
      if (!listId) return;

      history.push(homeTaskSettingRoute(listId, completedData.createTask.id));
      api?.unselect();
    },
  });
  const updateTask = useUpdateTask();
  const updateRepeat = useUpdateRepeat();

  /**
   * Create task on current list if `:listId` is in url.
   *  Add it to the first queried list otherwise.
   */
  const createCalendarTask = useCallback(
    (start: Date, end: Date, includeTime: boolean) => {
      const listId = match?.params.listId ?? data?.lists[0]?.id;
      if (!listId) return;

      createTaskWithRedirect(listId, {
        title: "Untitled",
        done: null,
        start: start.toISOString(),
        end: end.toISOString(),
        includeTime,
        color: null,
        repeat: null,
      });
    },
    [match, data, createTaskWithRedirect]
  );

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <Calendar
      lists={data.lists}
      createCalendarTask={createCalendarTask}
      updateTask={updateTask}
      createTask={createTask}
      updateRepeat={updateRepeat}
    />
  );
};
