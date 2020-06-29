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
import MyActiveOffers from "./my_active_offers";
import ActiveListing from "./active_listing";
import EditTask from "./edit_task/EditTask"; 
import Profile from "./profile/Profile";
import TaskOffers from "./edit_task_offers/TaskOffers";
import TaskOffer from "./edit_task_offers_id/TaskOffer";
import TaskChat from "./task_chat";
import MyProfileEdit from "./my_profile_edit";
import DeleteAccount from "./delete_account";
import queryString from "query-string";

import E404 from "./E404";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import isAuthLoading from "../utils/isAuthLoading";
import ForgetPassword from "./forget_password";

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
        else {
            return <Redirect to={this.props.to || "/"} />
        }
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
            <Route path="/task/:taskId" component={Task} exact />
            <Route path="/task/:taskId/qa" component={TaskChat} exact/>
            <Route path="/task/:taskId/edit" component={EditTask} exact />
            <Route path="/task/:taskId/edit/offers" component={TaskOffers} exact />
            <Route path="/task/:taskId/edit/offers/:offerId" component={TaskOffer} exact />
            <Route path="/active_listing" component={ActiveListing} exact />
            <Route path="/profile/:userId" component={Profile} exact/>
            <Route path="/my_active_tasks" component={() =>
                <ProtectedRoute Component={MyActiveTasks} allowLoggedIn={true} />
            } />
            <Route path="/forget_password" component={() =>
                <ProtectedRoute Component={ForgetPassword} allowLoggedIn={false} />
            } />
            <Route path="/delete_account" component={() =>
                <ProtectedRoute Component={DeleteAccount} allowLoggedIn={true} />
            } />
            <Route path="/my_profile_edit" component={() =>
                <ProtectedRoute Component={MyProfileEdit} allowLoggedIn={true} />
            } />
            <Route path="/my_active_offers" component={() =>
                <ProtectedRoute Component={MyActiveOffers} allowLoggedIn={true} />
            } />
            <Route path="/logout" component={() => {
                props.logout()
                return <Redirect to="/"/>
            }} />

            { /* TODO: Switch to closed Route tags */}
            
            <Route path="/create-task" exact>
                <ProtectedRoute to="/register" Component={CreateTask} allowLoggedIn={true} />
            </Route>


            <Route path="/login" exact>
                <ProtectedRoute Component={Login} allowLoggedIn={false} />
            </Route>

            <Route path="/register" exact>
                <ProtectedRoute Component={Register} allowLoggedIn={false} />
            </Route>


            <Route path="/setup" exact>
                <ProtectedRoute to="/register" Component={Setup} allowLoggedIn={true} />
            </Route>

            <Route path="/" component={E404} />
        </Switch>

    )
}


export default compose(connect(mapStateToProps, { logout }),withRouter)(Routes);