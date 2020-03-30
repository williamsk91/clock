import { Route, Switch } from "react-router-dom";

import { HomeRoute } from "./Home/HomeRoute";
import { ListRoute } from "./List/ListRoute";
import { LoginRoute } from "./Login/Login";
import React from "react";
import { listPath } from "./List/listPath";
import { loginPath } from "./Login/loginPath";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route path={listPath} component={ListRoute} />
      <Route path={loginPath} component={LoginRoute} />
    </Switch>
  );
}

export default App;
