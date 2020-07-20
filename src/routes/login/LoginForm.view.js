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
          <input
            ref={ref => this.emailRef = ref}
            onKeyDown={this.props.handleInputKeyDown}
            placeholder="Email"
            type="email"
            value={this.props.email.value}
            onChange={this.props.email.onChange}
          />
          <input
            onKeyDown={this.props.handleInputKeyDown}
            placeholder="Password"
            type="password"
            value={this.props.password.value}
            onChange={this.props.password.onChange}
          />
          {this.props.errors.map((x) => (
            <div class="register__form--error">{x}</div>
          ))}
          </div>
          <div className="register__button">
          
            <Link to="/forget_password" style={{ marginBottom: "10%", fontSize: 20}}>Trouble loging in?</Link>
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
