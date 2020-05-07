import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";

export default props => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
        </Switch>
    )
}