import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

class RegisterForm extends React.Component {
  componentDidMount(){
    this.firstNameRef.focus()
  }
  render(){
    let clicklable = this.props.first_name.value && this.props.last_name.value && this.props.email.value && this.props.password.value
    return (
      <React.Fragment>
        <form className="register__form" onSubmit={clicklable ? this.props.onSubmit : e => e.preventDefault()}>
        <div className="mobile__welcome">
          <h5>Welcome to eazytask</h5>
          <p>Please fill the information</p>
        </div> 
         <div className="flex-grow">
          <div className="register__form--flex">
            <input
              ref={ref => this.firstNameRef = ref}
              onKeyDown={this.props.handleInputKeyDown}
              placeholder="First name"
              className="fs27"
              type="text"
              value={this.props.first_name.value}
              onChange={this.props.first_name.onChange}
            />
            <input
                className="fs27"
                onKeyDown={this.props.handleInputKeyDown}
              placeholder="Last name"
              type="text"
              value={this.props.last_name.value}
              onChange={this.props.last_name.onChange}
            />
          </div>
          <input
              className="fs27"
              onKeyDown={this.props.handleInputKeyDown}
            placeholder="Email"
            type="email"
            value={this.props.email.value}
            onChange={this.props.email.onChange}
          />
          <input
              onKeyDown={this.props.handleInputKeyDown}
              className="fs27"
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
            <p className="robot" style={{ fontSize: 20 }} onClick={e => e.preventDefault()}>
              By joining on platform I confirm that I read and
              understood all the <Link style={{ fontSize: 20, color: "#4068a3" }} to={{ pathname: "/terms_and_conditions", state: { backPathname: "/register" } }}>Terms&Conditions</Link> of eazytask
            </p>
            {this.props.loading && "Loading"}
            {!this.props.loading && <button className={
              clicklable
                ? "button__style "
                : "button__style not-filled"
            }>Join us</button>}
          </div>
        </form>
         
      </React.Fragment>
    );
  }
}

export default RegisterForm;
