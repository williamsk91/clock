import { Route, Switch } from "react-router-dom";

import { HomeRoute } from "./Home/HomeRoute";
import { ListRoute } from "./List/ListRoute";
import React from "react";
import { listPath } from "./List/listPath";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route path={listPath} component={ListRoute} />
    </Switch>
  );
}

export default App;
