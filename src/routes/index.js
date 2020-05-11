import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login/index.js";
import Register from "./register/index.js";
import E404 from "./E404/index.js";

export default props => {
    return (
        <Switch>
        
            <Route path="/" exact>
                <Home />
            </Route>
            
            <Route path="/login" exact>
                <Login />
            </Route>

            <Route path="/register" exact>
                <Register />
            </Route>
            
            <Route path="/">
                <E404/>
            </Route>
        
        </Switch>
    )
}