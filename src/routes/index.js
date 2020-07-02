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
import DeleteAccountThank from "./delete_account_thank";
import Dashboard from "./dashboard";
import AdminPosts from "./admin/posts";
import AdminPostsCreate from "./admin/posts_create";
import AdminPostEdit from "./admin/posts_edit";

import Blog from "./blog/home";
import SingleBlog from "./blog/single";

import E404 from "./E404";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import isAuthLoading from "../utils/isAuthLoading";
import ForgetPassword from "./forget_password";

let mapStateToProps = state => ({ auth: state.auth })

const _ProtectedRoute = props => {
    let Component = props.Component
    // If props.auth.isAuthenticated it means no auth request was sent to the server
    // If isAuthLoading is true then it means that the request is not back
    // Both are required to determine wether a request is sent and receiver
    let authRequestBack =
        props.auth.isAuthenticated !== undefined &&
        !isAuthLoading(props.auth)

    if (props.auth.isAuthenticated === props.allowLoggedIn)
        return <Component {...props.props} />
    else if (!authRequestBack) return null;
    else {
        return <Redirect to={props.to || "/"} />
    }
} 

const _AdminOnly = props => {
    let Component = props.Component
    // If props.auth.isAuthenticated it means no auth request was sent to the server
    // If isAuthLoading is true then it means that the request is not back
    // Both are required to determine wether a request is sent and receiver
    let authRequestBack =
        props.auth.isAuthenticated !== undefined &&
        !isAuthLoading(props.auth)

    if (props.auth.isAuthenticated && props.auth.profile.isAdmin)
        return <Component {...props.props} />
    else if (!authRequestBack) return null;
    else {
        return <Redirect to={props.to || "/"} />
    }
}

const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute)
const AdminOnly = connect(mapStateToProps)(_AdminOnly)

const Routes = props => {
    if (
        props.auth.profile && 
        !props.auth.profile.setupCompleted && 
        props.location.pathname !== "/setup"
    ) return <Redirect to="/setup"/> 
    return (
        <Switch>
            <Route exact path="/admin/posts" component={() =>
                <AdminOnly to="/dashboard" Component={AdminPosts} />
            } />
            <Route exact path="/admin/posts/create" component={() =>
                <AdminOnly to="/dashboard" Component={AdminPostsCreate} />
            } />
            <Route exact path="/admin/posts/:postId/edit" component={() =>
                <AdminOnly to="/dashboard" Component={AdminPostEdit} />
            } />

            <Route path="/" component={Home} exact/>
            <Route path="/task/:taskId" component={Task} exact />
            <Route path="/task/:taskId/qa" component={TaskChat} exact/>
            <Route path="/task/:taskId/edit" component={EditTask} exact />
            <Route path="/task/:taskId/edit/offers" component={TaskOffers} exact />
            <Route path="/task/:taskId/edit/offers/:offerId" component={TaskOffer} exact />
            <Route path="/active_listing" component={ActiveListing} exact />
            <Route path="/profile/:userId" component={Profile} exact/>
            <Route path="/delete_account/thank" component={DeleteAccountThank} exact/>

            <Route path="/blog" component={Blog} exact />
            <Route path="/blog/:postId" component={SingleBlog} exact />


            <Route path="/dashboard" component={() =>
                <ProtectedRoute to="/login" Component={Dashboard} allowLoggedIn={true} />
            } />
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