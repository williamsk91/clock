import React, { useCallback } from "react";
import { Redirect, Switch, useHistory } from "react-router-dom";

import { Calendar } from "../components/Calendar";
import { routes } from "../components/route";
import { PrivateRoute } from "../components/Route/PrivateRoute";
import { Spacer } from "../components/Spacer";
import { Sidebar } from "../components/styles/layout";
import { hasDateP, isNotDoneP } from "../components/taskFilter";
import { useUpdateTask } from "../data/mutation/task";
import { CalendarListsQuery } from "../graphql/generated";
import { ListSettingSidebarWithData } from "./Sidebar/ListSettingSidebar";
import { ListSidebarWithData } from "./Sidebar/ListSidebar";
import { ListsSidebarWithData } from "./Sidebar/ListsSidebar";
import { TaskSidebarWithData } from "./Sidebar/TaskSettingSidebar";

interface Props {
  tasks: CalendarListsQuery["lists"][0]["tasks"];
}

/**
 * Displays a list of task and a weekly calendar
 */
export const HomePage = (props: Props) => {
  const { tasks } = props;
  const history = useHistory();

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

  return (
    <Sidebar.Container>
      <Sidebar.SideBar>
        <Switch>
          <PrivateRoute
            exact
            path={routes.home.index}
            component={ListsSidebarWithData}
          />
          <PrivateRoute
            exact
            path={routes.home.list}
            component={ListSidebarWithData}
          />
          <PrivateRoute
            exact
            path={routes.home.listSetting}
            component={ListSettingSidebarWithData}
          />
          <PrivateRoute
            exact
            path={routes.home.taskSetting}
            component={TaskSidebarWithData}
          />
          <Redirect to={routes.error} />
        </Switch>
      </Sidebar.SideBar>
      <Sidebar.Content>
        <Spacer spacing="12" />
        <Calendar
          tasks={tasks.filter(hasDateP).filter(isNotDoneP)}
          updateTask={updateTask}
          createTask={createCalendarTask}
        />
      </Sidebar.Content>
    </Sidebar.Container>
  );
};
