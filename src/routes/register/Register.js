import React from "react";
import { connect } from "react-redux";
import { postUser } from "./Register.redux.thunk.js";
import { postAuth } from "../login/Login.redux.thunk";
import RegisterForm from "./RegisterForm.view";
import { POST_USER } from "./Register.redux.actionTypes";
import Button from "../../components/button";
import { Redirect } from "react-router-dom";
import LoginRegisterHeader from "../../components/loginRegisterHeader";

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

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
    if (
      this.props.auth[POST_USER] &&
      (!this.props.auth[POST_USER].errors ||
        !this.props.auth[POST_USER].errors.length)
    ) {
      this.props.postAuth({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };
  getErrors = () => {
    if (this.props.auth && this.props.auth[POST_USER])
      if (this.props.auth[POST_USER].errors)
        return this.props.auth[POST_USER].errors;
    return [];
  };
  render() {
    if (this.props.auth.isAuthenticated) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <RegisterForm
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
          onSubmit={this.onSubmit}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { postUser, postAuth })(Register);
