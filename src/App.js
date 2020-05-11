import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styled from "styled-components";
import { Grid } from "react-foundation";
import Login from "./3.components/login";
import Register from "./3.components/register";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Grid>
              <Header>
                <Link className="navbar-brand" to={"/sign-in"}>
                  - EasyTask
                </Link>
              </Header>
            </Grid>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Register} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  padding-top: 80px;
  padding-bottom: 20px;
  background-color: #fff;
`;

export default App;
