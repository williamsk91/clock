import "@fullcalendar/react";

import React from "react";
import { Route, Switch } from "react-router-dom";

import { CalendarProvider } from "./components/context/CalendarContext";
import { PrivateRoute } from "./components/Route/PrivateRoute";
import { HomeRoute } from "./Home/HomeRoute";
import { LoginRoute } from "./Login/Login";
import { SettingRoute } from "./Setting/Setting";

function App() {
  return (
    <CalendarProvider>
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <PrivateRoute exact path="/setting" component={SettingRoute} />
        <PrivateRoute path="/" component={HomeRoute} />
      </Switch>
    </CalendarProvider>
  );
}

export default App;
