import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { compose } from "recompose";

import Home from "./home";
import Login from "./login";
import Register from "./register";
import Setup from "./setup";
import CreateTask from "./create_task";
import Task from "./task";
import MyActiveTasks from "./my_active_tasks";

import E404 from "./E404";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import isAuthLoading from "../utils/isAuthLoading";

let mapStateToProps = state => ({ auth: state.auth })

class _ProtectedRoute extends React.Component {
    render(){
        let Component = this.props.Component
        // If this.props.auth.isAuthenticated it means no auth request was sent to the server
        // If isAuthLoading is true then it means that the request is not back
        // Both are required to determine wether a request is sent and receiver
        let authRequestBack = 
            this.props.auth.isAuthenticated !== undefined && 
            !isAuthLoading(this.props.auth)

        if (this.props.auth.isAuthenticated === this.props.allowLoggedIn) 
            return <Component {...this.props.props} />
        else if (!authRequestBack) return null;
        else return <Redirect to="/" />
    }
}

const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute)

const Routes = props => {
    console.log("------>",{props})
    if (
        props.auth.profile && 
        !props.auth.profile.setupCompleted && 
        props.location.pathname !== "/setup"
    ) return <Redirect to="/setup"/> 
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/task/:taskId" component={Task} exact/>
            <Route path="/my_active_tasks" component={ () => 
                <ProtectedRoute Component={MyActiveTasks} allowLoggedIn={true}/>
            }/>

            { /* TODO: Switch to closed Route tags */}
            
            <Route path="/create-task" exact>
                <ProtectedRoute Component={CreateTask} allowLoggedIn={true} />
            </Route>


            <Route path="/login" exact>
                <ProtectedRoute Component={Login} allowLoggedIn={false} />
            </Route>

            <Route path="/register" exact>
                <ProtectedRoute Component={Register} allowLoggedIn={false} />
            </Route>


            <Route path="/setup" exact>
                <ProtectedRoute Component={Setup} allowLoggedIn={true} />
            </Route>


            <Route path="/" component={E404} />
        </Switch>

    )
}


export default compose(connect(mapStateToProps),withRouter)(Routes);