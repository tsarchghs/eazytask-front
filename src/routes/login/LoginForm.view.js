import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

class LoginForm extends React.Component{
  componentDidMount(){
    this.emailRef.focus();
  }
  render(){
    return (
      <React.Fragment>
        <div className="mobile__welcome">
          <h5>Welcome back</h5>
          <p>Please fill the credentials</p>
        </div>
        <form className="register__form" onSubmit={Boolean(this.props.email.value) && Boolean(this.props.password.value) ? this.props.onSubmit : e => e.preventDefault()}>
          <div className="flex-grow"> 
          {
            window.location.search.indexOf("from_register") !== -1 &&
            <p className="special">You have successfully registered, check your email to verify your account!</p>
          }
          {
            window.location.search.indexOf("invalid_verification_link") !== -1
            ?  <p className="special">The link is either invalid or has expired!</p>
            : window.location.search.indexOf("valid_verification_link") !== -1 ? 
            <p className="special">Account verified! You can now log in.</p> : ""
          }

          <input
            ref={ref => this.emailRef = ref}
            onKeyDown={this.props.handleInputKeyDown}
            placeholder="Email"
            type="email"
              className="fs27"
              value={this.props.email.value}
            onChange={this.props.email.onChange}
          />
          <input
            onKeyDown={this.props.handleInputKeyDown}
            placeholder="Password"
              className="fs27"
              type="password"
            value={this.props.password.value}
            onChange={this.props.password.onChange}
          />
          {this.props.errors.map((x) => (
            <div class="register__form--error">{x}</div>
          ))}
          </div>
          <div className="register__button">
          
            <Link to="/forget_password" style={{ marginBottom: "10%", fontSize: 20}} className="roboto">Trouble loging in?</Link>
            { this.props.loading && "Loading"}
            { !this.props.loading && 
                <button
                  className={
                    Boolean(this.props.email.value) && Boolean(this.props.password.value)
                      ? "button__style "
                      : "button__style not-filled"
                  }
                >
                  Join us
              </button>
            }
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
