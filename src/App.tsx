import { Route, Switch } from "react-router-dom";

import { HomeRoute } from "./Home/HomeRoute";
import { LoginRoute } from "./Login/Login";
import { PrivateRoute } from "./components/Route/PrivateRoute";
import React from "react";
import { SettingRoute } from "./Setting/Setting";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <PrivateRoute exact path="/" component={HomeRoute} />
      <PrivateRoute exact path="/setting" component={SettingRoute} />
    </Switch>
  );
}

export default App;
