import React from "react";
import { connect } from "react-redux";
import { getAuth } from "./App.redux.thunk";
import { logout } from "../../redux/actions";
import Routes from "../../routes";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import LoginRegisterHeader from "../loginRegisterHeader";

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
    };
  }
  componentDidMount() {
    // Cookies.set("eazytask:token","fff");
    this.props.getAuth();
  }

  changeImg = () => {
    this.setState({
      isActive: true,
    });
  };

  noChangeImg = () => {
    this.setState({
      isActive: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* In App.js ->  */}
        {/* {this.props.auth.isAuthenticated
          ? "isAuthenticated"
          : "Not isAuthenticated"} */}
        {this.props.auth.isAuthenticated && (
          <button onClick={this.props.logout}>Logout</button>
        )}{" "}
        <div className="layout">
          <div className="layout__form">
            <LoginRegisterHeader />
            <h4 className="shadow-text">join eazytask now</h4>
            <div className="grid-container register__tabs">
              <NavLink to="/login" onClick={this.noChangeImg}>
                <button>Log In</button>
              </NavLink>
              <NavLink to="/register" onClick={this.changeImg}>
                <button>Register</button>
              </NavLink>
            </div>
            <div className="grid-container register__layout">
              <Routes />
            </div>
          </div>
          <div
            className={
              this.state.isActive === true
                ? "layout__image change"
                : "layout__image"
            }
          ></div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { getAuth, logout })(App);
