import React from "react";
import { connect } from "react-redux";
import { postAuth } from "../../actions/auth";
import { POST_AUTH } from "../../actionTypes";
import LoginForm from "./LoginForm.view";
import Button from "../../components/button";
import LoginRegisterHeader from "../../components/loginRegisterHeader";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (property) => (e) =>
    this.setState({
      [property]: e.target.value,
    });
  onSubmit = (e) => {
    e.preventDefault();
    console.log({state:this.state},191)
    this.props.postAuth({
      email: this.state.email,
      password: this.state.password,
    });
  };
  getErrors = () => {
    let { errors } = this.props[POST_AUTH];
    if (errors && errors.length)
      return errors;
    return [];
  };
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
                <LoginForm
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
                  loading={this.props[POST_AUTH].loading}
                />
            </div>
          </div>
          <div className="layout__image"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state) return state;
  console.log({state});
  return { 
    isAuthenticated: state.auth.isAuthenticated,
    POST_AUTH: state.auth[POST_AUTH] 
  };
};

export default connect(mapStateToProps, { postAuth })(Login);
