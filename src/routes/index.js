import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Register from "./register";
import Setup from "./setup";
import CreateTask from "./create_task";
import E404 from "./E404";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import isAuthLoading from "../utils/isAuthLoading";

class _ProtectedRoute extends React.Component {
    render(){
        let Component = this.props.Component
        // If this.props.auth.isAuthenticated it means no auth request was sent to the server
        // If isAuthLoading is true then it means that the request is not back
        // Both are required to determine wether a request is sent and receiver
        let authRequestBack = 
            this.props.auth.isAuthenticated !== undefined && 
            !isAuthLoading(this.props.auth)

        if (this.props.auth.isAuthenticated === this.props.allowLoggedIn) return <Component {...this.props.props} />
        else if (!authRequestBack) return null;
        else return <Redirect to="/" />
    }
}
let mapStateToProps = state => ({ auth: state.auth })
const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute)


const Routes = props => (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>

        <Route path="/login" exact>
            <ProtectedRoute Component={Login} allowLoggedIn={false} />
        </Route>

        <Route path="/register" exact>
            <ProtectedRoute Component={Register} allowLoggedIn={false} />
        </Route>

        <Route path="/create-task" exact>
            <ProtectedRoute Component={CreateTask} allowLoggedIn={true} />
        </Route>

        <Route path="/setup" exact>
            <ProtectedRoute Component={Setup} allowLoggedIn={true} />
        </Route>


        <Route path="/">
            <E404 />
        </Route>
    </Switch>
)


export default connect(mapStateToProps)(Routes);