import React, { Suspense, lazy } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import isAuthLoading from "../utils/isAuthLoading";

// import MobileSettings from "./settings/MobileSettings";
// import NotificationSettings from "./settings/NotificationSettings"
// import ChangePasswordSettings from "./settings/ChangePasswordSettings"
// import DeleteAccountSettings from "./settings/DeleteAccountSettings"
// import AboutSettings from "./settings/AboutSettings"
// import AdminDashboard from "./admin/dashboard";
// import ChangePreferencesSettings from "./settings/ChangePreferencesSettings";
import ReloadPage from "./reload_page"

const MobileSettings = lazy(() => import("./settings/MobileSettings"))
const NotificationSettings = lazy(() => import("./settings/NotificationSettings"))
const ChangePasswordSettings = lazy(() => import("./settings/ChangePasswordSettings"))
const DeleteAccountSettings = lazy(() => import("./settings/DeleteAccountSettings"))
const AboutSettings = lazy(() => import("./settings/AboutSettings"))
const AdminDashboard = lazy(() => import("./admin/dashboard"))
const ChangePreferencesSettings = lazy(() => import("./settings/ChangePreferencesSettings"))

let thenCallback = val => val;
let errorCallback = val => {
    console.log("ERRORRRRR")
    return import("./reload_page").then(Comp => <Comp err={val}/>)
}

const Home = lazy(() => import('./home').then(thenCallback).catch(errorCallback));
const Login = lazy(() => import('./login').then(thenCallback).catch(errorCallback));
const Register = lazy(() => import('./register').then(thenCallback).catch(errorCallback));
const Setup = lazy(() => import('./setup').then(thenCallback).catch(errorCallback));
const CreateTask = lazy(() => import('./create_task').then(thenCallback).catch(errorCallback));
const Task = lazy(() => import('./task').then(thenCallback).catch(errorCallback));
const MyActiveTasks = lazy(() => import('./my_active_tasks').then(thenCallback).catch(errorCallback));
const MyActiveOffers = lazy(() => import('./my_active_offers').then(thenCallback).catch(errorCallback));
const ActiveListing = lazy(() => import('./active_listing').then(thenCallback).catch(errorCallback));
const EditTask = lazy(() => import('./edit_task/EditTask').then(thenCallback).catch(errorCallback));
const Profile = lazy(() => import('./profile/Profile').then(thenCallback).catch(errorCallback));
const TaskOffers = lazy(() => import('./edit_task_offers/TaskOffers').then(thenCallback).catch(errorCallback));
const TaskOffer = lazy(() => import('./edit_task_offers_id/TaskOffer').then(thenCallback).catch(errorCallback));
const TaskChat = lazy(() => import('./task_chat').then(thenCallback).catch(errorCallback));
const MyProfileEdit = lazy(() => import('./my_profile_edit').then(thenCallback).catch(errorCallback));
const DeleteAccount = lazy(() => import('./delete_account').then(thenCallback).catch(errorCallback));
const DeleteAccountThank = lazy(() => import('./delete_account_thank').then(thenCallback).catch(errorCallback));
const Dashboard = lazy(() => import('./dashboard').then(thenCallback).catch(errorCallback));
const AdminPosts = lazy(() => import('./admin/posts').then(thenCallback).catch(errorCallback));
const AdminPostsCreate = lazy(() => import('./admin/posts_create').then(thenCallback).catch(errorCallback));
const AdminPostEdit = lazy(() => import('./admin/posts_edit').then(thenCallback).catch(errorCallback));
const Blog = lazy(() => import('./blog/home').then(thenCallback).catch(errorCallback));
const SingleBlog = lazy(() => import('./blog/single').then(thenCallback).catch(errorCallback));
const ForgetPassword = lazy(() => import('./forget_password').then(thenCallback).catch(errorCallback));
const FAQ = lazy(() => import('./faq').then(thenCallback).catch(errorCallback));
const History = lazy(() => import('./history').then(thenCallback).catch(errorCallback));
const TermsAndConditions = lazy(() => import('./terms_and_conditions').then(thenCallback).catch(errorCallback));
const E404 = lazy(() => import('./E404').then(thenCallback).catch(errorCallback));
const MobileNotifications = lazy(() => import("./mobile_notifications"))
const ChangePhoneNumber = lazy(() => import("./change_phone_number").then(thenCallback).catch(errorCallback));
const Impressum = lazy(() => import("./impressum"))
const SettingsChangeSkills = lazy(() => import("./settings_change_skills").then(thenCallback).catch(errorCallback));
const SettingsChangeLanguages = lazy(() => import("./settings_change_languages").then(thenCallback).catch(errorCallback));
const SettingsChangeCities = lazy(() => import("./settings_change_cities").then(thenCallback).catch(errorCallback));
const VerifyAccount = lazy(() => import("./verify_account").then(thenCallback).catch(errorCallback))

// import Login from "./login";
// import Register from "./register";
// import Setup from "./setup";
// import CreateTask from "./create_task";
// import Task from "./task";
// import MyActiveTasks from "./my_active_tasks";
// import MyActiveOffers from "./my_active_offers";
// import ActiveListing from "./active_listing";
// import EditTask from "./edit_task/EditTask"; 
// import Profile from "./profile/Profile";
// import TaskOffers from "./edit_task_offers/TaskOffers";
// import TaskOffer from "./edit_task_offers_id/TaskOffer";
// import TaskChat from "./task_chat";
// import MyProfileEdit from "./my_profile_edit";
// import DeleteAccount from "./delete_account";
// import DeleteAccountThank from "./delete_account_thank";
// import Dashboard from "./dashboard";
// import AdminPosts from "./admin/posts";
// import AdminPostsCreate from "./admin/posts_create";
// import AdminPostEdit from "./admin/posts_edit";

// import Blog from "./blog/home";
// import SingleBlog from "./blog/single";

// import E404 from "./E404";

// import ForgetPassword from "./forget_password";

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
        props.auth.isAuthenticated && 
        props.auth.profile && 
        !props.auth.profile.setupCompleted && 
        props.location.pathname !== "/setup"
    ) return <Redirect to="/setup"/> 
    let commonProps = {
        goBack: props.goBack
    }
    console.log("COMMON_PROPS",commonProps)
    return (
        <React.Fragment>
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Route exact path="/settings" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={MobileSettings} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/notifications" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={NotificationSettings} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/change_password" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={ChangePasswordSettings} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/delete_account" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={DeleteAccountSettings} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/about" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={AboutSettings} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/change_preferences" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={ChangePreferencesSettings} allowLoggedIn={true} />
                    } />


                    <Route exact path="/settings/change_skills" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={SettingsChangeSkills} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/change_cities" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={SettingsChangeCities} allowLoggedIn={true} />
                    } />
                    <Route exact path="/settings/change_languages" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={SettingsChangeLanguages} allowLoggedIn={true} />
                    } />


                    <Route exact path="/admin" component={
                        () => <Redirect to="/admin/dashboard"/>
                    }/>
                    <Route exact path="/admin/dashboard" component={() =>
                        <AdminOnly to="/dashboard" props={commonProps} Component={AdminDashboard} />
                    } />
                    
                    <Route exact path="/terms_and_conditions" component={() => <TermsAndConditions {...commonProps} />}/>

                    <Route exact path="/admin/posts" component={() =>
                        <AdminOnly to="/dashboard" props={commonProps} Component={AdminPosts} />
                    } />
                    <Route exact path="/admin/posts/create" component={() =>
                        <AdminOnly to="/dashboard" props={commonProps} Component={AdminPostsCreate} />
                    } />
                    <Route exact path="/admin/posts/:postId/edit" component={() =>
                        <AdminOnly to="/dashboard" props={commonProps} Component={AdminPostEdit} />
                    } />

                    <Route exact path="/" component={() =>
                        <ProtectedRoute to="/dashboard" props={commonProps} Component={Home} allowLoggedIn={false} />
                    } />

                    <Route exact path="/landing_page" component={() =>
                        <ProtectedRoute to="/" props={commonProps} Component={Home} allowLoggedIn={true} />
                    } />

                    <Route exact path="/history" component={() =>
                        <ProtectedRoute to="/" props={commonProps} Component={History} allowLoggedIn={true} />
                    } />

                    <Route path="/faq" component={() => <FAQ {...commonProps}/>} exact />
                    <Route path="/" component={() => <Home {...commonProps}/>} exact/>
                    <Route path="/verify_account/:token" component={VerifyAccount} exact/>
                    <Route path="/task/:taskId" component={() => <Task {...commonProps}/>} exact />
                    <Route path="/task/:taskId/qa" component={() => <TaskChat {...commonProps}/>} exact/>
                    <Route path="/task/:taskId/edit" component={() => <EditTask {...commonProps}/>} exact />
                    <Route path="/task/:taskId/edit/offers" component={() => <TaskOffers {...commonProps}/>} exact />
                    <Route path="/task/:taskId/edit/offers/:offerId" component={() => <TaskOffer {...commonProps}/>} exact />
                    <Route path="/active_listing" component={() => <ActiveListing {...commonProps}/>} exact />
                    <Route path="/profile/:userId" component={() => <Profile {...commonProps}/>} exact/>
                    <Route path="/delete_account/thank" component={() => <DeleteAccountThank {...commonProps}/>} exact/>
                    <Route path="/impressum" component={() => <Impressum {...commonProps}/>} exact/>
                    
                    <Route path="/blog" component={() => <Blog {...commonProps}/>} exact />
                    <Route path="/blog/:postId" component={() => <SingleBlog {...commonProps}/>} exact />


                    <Route path="/dashboard" component={() =>
                        <ProtectedRoute to="/login" props={commonProps}Component={Dashboard} allowLoggedIn={true} />
                    } />
                    <Route path="/mobile_notifications" component={() =>
                        <ProtectedRoute to="/login" props={commonProps}Component={MobileNotifications} allowLoggedIn={true} />
                    } />
                    <Route path="/change_phone_number" component={() =>
                        <ProtectedRoute to="/login" props={commonProps}Component={ChangePhoneNumber} allowLoggedIn={true} />
                    } />
                    <Route path="/my_active_tasks" component={() =>
                        <ProtectedRoute to="/login" props={commonProps}Component={MyActiveTasks} allowLoggedIn={true} />
                    } />
                    <Route path="/forget_password" component={() =>
                        <ProtectedRoute props={commonProps}Component={ForgetPassword} allowLoggedIn={false} />
                    } />
                    <Route path="/delete_account" component={() =>
                        <ProtectedRoute to="/login" props={commonProps}Component={DeleteAccount} allowLoggedIn={true} />
                    } />
                    <Route path="/my_profile_edit" component={() =>
                        <ProtectedRoute to="/login" Component={MyProfileEdit} allowLoggedIn={true} />
                    } />
                    <Route path="/my_active_offers" component={() =>
                        <ProtectedRoute to="/login" props={commonProps} Component={MyActiveOffers} allowLoggedIn={true} />
                    } />
                    <Route path="/logout" component={() => {
                        props.logout()
                        localStorage.removeItem("eazytask:token")
                        window.location.href = "/"
                        return null //<Redirect to="/"/>
                    }} />

                    { /* TODO: Switch to closed Route tags */}
                    
                    <Route path="/create-task" exact>
                        <ProtectedRoute to="/register" props={commonProps} Component={CreateTask} allowLoggedIn={true} />
                    </Route>


                    <Route path="/login" exact>
                        <ProtectedRoute to="/dashboard" props={commonProps} Component={Login} allowLoggedIn={false} />
                    </Route>

                    <Route path="/register" exact>
                        <ProtectedRoute to="/dashboard" props={commonProps} Component={Register} allowLoggedIn={false} />
                    </Route>


                    <Route path="/setup" exact>
                        <ProtectedRoute to="/register" props={commonProps} Component={Setup} allowLoggedIn={true} />
                    </Route>
                    
                    <Route path="/" component={E404} />
                </Switch>
            </Suspense>
        </React.Fragment>

    )
}


export default compose(connect(mapStateToProps, { logout }),withRouter)(Routes);