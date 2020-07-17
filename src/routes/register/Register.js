import React from "react";
import { connect } from "react-redux";
import { postAuth } from "../../actions/auth";
import { postUser } from "../../actions/user";
import { POST_USER } from "../../actionTypes";
import RegisterForm from "./RegisterForm.view";
import Button from "../../components/button";
import LoginRegisterHeader from "../../components/loginRegisterHeader";
import { NavLink } from "react-router-dom";

let showError = {
  "requestBody.email is a required field": "Email is a required field",
  "requestBody.password is a required field": "Password is a required field",
  "requestBody.email must be a valid email": "Email must be a valid email",
  "requestBody.first_name is a required field": "First name is a required field",
  "requestBody.last_name is a required field": "Last name is a required field",
  "requestBody.password must be at least 6 characters": "Password must be at least 6 characters",
  "users.email must be unique": "Email is already taken",
  "requestBody.first_name must be at least 2 characters": "First name must be at least 2 characters",
  "requestBody.last_name must be at least 2 characters": "Last name must be at least 2 characters",
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (property) => (e) =>
    this.setState({
      [property]: e.target.value,
    });
  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.postUser({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    });
  };
  getErrors = () => {
    let { errors } = this.props;
    if (errors && errors.length)
      return errors.map(x => showError[x] || x);
    return [];
  };
  handleInputKeyDown = e => {
    if (e.key == "Enter") {
      this.onSubmit(e)
    }
  }
  render() {
    return (
      <React.Fragment>
          <div className="layout">
            <div className="layout__form">
              <LoginRegisterHeader />
              <h4 className="shadow-text">join eazytask now</h4>
              <div className="grid-container register__tabs">
                <NavLink to="/login">
                  <button>Log In</button>
                </NavLink>
                <NavLink to="/register" onClick={this.changeImg}>
                  <button>Register</button>
                </NavLink>
              </div>
              <div className="grid-container register__layout">
                <RegisterForm
                  handleInputKeyDown={this.handleInputKeyDown}
                  first_name={{
                    value: this.state.first_name,
                    onChange: this.onChange("first_name"),
                  }}
                  last_name={{
                    value: this.state.last_name,
                    onChange: this.onChange("last_name"),
                  }}
                  email={{
                    value: this.state.email,
                    onChange: this.onChange("email"),
                  }}
                  password={{
                    value: this.state.password,
                    onChange: this.onChange("password"),
                  }}
                  errors={this.getErrors()}
                  loading={this.props.loading}
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
            <div className="layout__image change"></div>
          </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state) return state;
  return {
    ...state.auth[POST_USER],
    isAuthenticated: state.auth.isAuthenticated,
  };
};


export default connect(mapStateToProps, { postUser, postAuth })(Register);
