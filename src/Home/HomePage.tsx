import { Redirect, Switch } from "react-router-dom";

import { TrackWithRoutes } from "../components";
import { routes } from "../components/route";
import { PrivateRoute } from "../components/Route/PrivateRoute";
import { Spacer } from "../components/Spacer";
import { Sidebar } from "../components/styles/layout";
import { CalendarWithData } from "./CalendarWithData";
import { CompletedTasksSidebarWithData } from "./Sidebar/CompletedTasksSidebar";
import { ListSettingSidebarWithData } from "./Sidebar/ListSettingSidebar";
import { ListSidebarWithData } from "./Sidebar/ListSidebar";
import { ListsSidebarWithData } from "./Sidebar/ListsSidebar";
import { TaskSidebarWithData } from "./Sidebar/TaskSettingSidebar";

/**
 * Displays a list of task and a weekly calendar
 */
export const HomePage = () => {
  return (
    <Sidebar.Container>
      <TrackWithRoutes />
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
          <PrivateRoute
            exact
            path={routes.home.completedTask}
            component={CompletedTasksSidebarWithData}
          />
          <Redirect to={routes.error} />
        </Switch>
      </Sidebar.SideBar>
      <Sidebar.Content>
        <Spacer spacing="12" />
        <CalendarWithData />
      </Sidebar.Content>
    </Sidebar.Container>
  );
};
