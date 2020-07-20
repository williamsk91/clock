import "@fullcalendar/react";

import React from "react";
import { Route, Switch } from "react-router-dom";

import { CalendarProvider } from "./components/context/CalendarContext";
import { routes } from "./components/route";
import { PrivateRoute } from "./components/Route/PrivateRoute";
import { HomeRoute } from "./Home/HomeRoute";
import { LoginRoute } from "./Login/Login";
import { SettingRoute } from "./Setting/Setting";

function App() {
  return (
    <CalendarProvider>
      <Switch>
        <Route exact path={routes.login} component={LoginRoute} />
        <PrivateRoute exact path={routes.setting} component={SettingRoute} />
        <PrivateRoute path={routes.home.index} component={HomeRoute} />
        <Route path="/" component={() => <div>errra</div>} />
      </Switch>
    </CalendarProvider>
  );
}

export default App;
