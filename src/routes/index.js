import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import Register from "./register";
import Setup from "./setup";
import E404 from "./E404";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ Component, loggedIn, allowLoggedIn, props = {} }) => {
    if (loggedIn === allowLoggedIn) return <Component {...props} />
    else return <Redirect to="/" />
}

class Routes extends React.Component {
    render(){
        return (
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                
                <Route path="/login" exact>
                    <ProtectedRoute Component={Login} loggedIn={this.props.isAuthenticated} allowLoggedIn={false} />
                </Route>

                <Route path="/register" exact>
                    <ProtectedRoute Component={Register} loggedIn={this.props.isAuthenticated} allowLoggedIn={false} />
                </Route>

                <Route path="/setup" exact>
                    <ProtectedRoute Component={Setup} loggedIn={this.props.isAuthenticated} allowLoggedIn={true} />
                </Route>
                
                <Route path="/">
                    <E404/>
                </Route>
            </Switch>
        )
    }
}

let mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect(mapStateToProps)(Routes);