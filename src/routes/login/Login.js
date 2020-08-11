import React from "react";
import { connect } from "react-redux";
import { postAuth } from "../../actions/auth";
import { POST_AUTH } from "../../actionTypes";
import LoginForm from "./LoginForm.view";
import Button from "../../components/button";
import LoginRegisterHeader from "../../components/loginRegisterHeader";
import { NavLink } from "react-router-dom";

let showError = {
  "requestBody.email is a required field": "Email is a required field",
  "requestBody.password is a required field": "Password is a required field",
  "requestBody.email must be a valid email": "The email address or password is incorrect. Please try again.",
  "requestBody.password must be at least 6 characters": "The email address or password is incorrect. Please try again."
}

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
    this.props.postAuth({
      email: this.state.email,
      password: this.state.password,
    });
  };
  getErrors = () => {
    let { errors } = this.props[POST_AUTH];
    if (errors && errors.length)
      if (errors[0] == "Please verify your email address.") 
        return [this.getTrans(this.props.translations.login_errors["VerifyEmail"])]
      else return [this.getTrans(this.props.translations.login_errors["InvalidCredentials"])]
      // return errors.filter((value,i) => errors.indexOf(value) === i).map(x => showError[x] || x);
    return [];
  };
  handleInputKeyDown = e => {
    if (e.key == "Enter") {
      this.onSubmit(e)
    }
  }
  getTrans = obj => {
    let data = obj[this.props.app_lang];
    if (typeof (data) == "string") return data;
    if (data.length) {
        return data.map(str => <React.Fragment>
            {str}<br />
        </React.Fragment>)
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
                <button className="fs62 fwb">{this.getTrans(this.props.translations.text_1)}</button>
              </NavLink>
              <NavLink to="/register" onClick={this.changeImg}>
                <button className="fs62">{this.getTrans(this.props.translations.text_2)}</button>
              </NavLink>
            </div>
            <div className="grid-container register__layout">
                <LoginForm
                  handleInputKeyDown={this.handleInputKeyDown}
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
                  translations={this.props.translations}
                  getTrans={this.getTrans}
                  common={this.props.common}
                />
            </div>
          </div>
          <div className="layout__image change" style={{
            backgroundImage: `url(/static/media/register-img.b2fc2804.jpeg)`
          }}></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state) return state;
  return { 
    isAuthenticated: state.auth.isAuthenticated,
    POST_AUTH: state.auth[POST_AUTH],
    translations: state.app_lang.data["/login-register"],
    app_lang: state.app_lang.app_lang,
    common: state.app_lang.common
  };
};

export default connect(mapStateToProps, { postAuth })(Login);
