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
          <h5>{this.props.getTrans(this.props.translations.text_13)}</h5>
          <p>{this.props.getTrans(this.props.translations.text_14)}</p>
        </div>
        <form className="register__form" onSubmit={Boolean(this.props.email.value) && Boolean(this.props.password.value) ? this.props.onSubmit : e => e.preventDefault()}>
          <div className="flex-grow"> 
          {
            window.location.search.indexOf("from_register") !== -1 &&
            <p className="special">{this.props.getTrans(this.props.translations.login_info["SuccessRegister"])}</p>
          }
          {
            window.location.search.indexOf("invalid_verification_link") !== -1
            ?  <p className="special">{this.props.getTrans(this.props.translations.login_info["InvalidLink"])}</p>
            : window.location.search.indexOf("valid_verification_link") !== -1 ? 
            <p className="special">{this.props.getTrans(this.props.translations.login_info["AccountVerified"])}</p> : ""
          }

          <input
            ref={ref => this.emailRef = ref}
            onKeyDown={this.props.handleInputKeyDown}
            placeholder={this.props.getTrans(this.props.translations.text_5)}
            type="email"
              className="fs27"
              value={this.props.email.value}
            onChange={this.props.email.onChange}
          />
          <input
            onKeyDown={this.props.handleInputKeyDown}
            placeholder={this.props.getTrans(this.props.translations.text_6)}
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
          
            <Link to="/forget_password" style={{ marginBottom: "10%", fontSize: 20}} className="roboto">{this.props.getTrans(this.props.translations.text_11)}</Link>
            { this.props.loading && "Loading"}
            { !this.props.loading && 
                <button
                  className={
                    Boolean(this.props.email.value) && Boolean(this.props.password.value)
                      ? "button__style "
                      : "button__style not-filled"
                  }
                >
                  {this.props.getTrans(this.props.translations.text_10)}
              </button>
            }
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
