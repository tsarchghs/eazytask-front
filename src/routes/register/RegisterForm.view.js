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
          <h5>{this.props.getTrans(this.props.translations.text_15)}</h5>
          <p>{this.props.getTrans(this.props.translations.text_16)}</p>
        </div> 
         <div className="flex-grow">
          <div className="register__form--flex">
            <input
              ref={ref => this.firstNameRef = ref}
              onKeyDown={this.props.handleInputKeyDown}
              placeholder={this.props.getTrans(this.props.translations.text_3)}
              className="fs27"
              type="text"
              value={this.props.first_name.value}
              onChange={this.props.first_name.onChange}
            />
            <input
                className="fs27"
                onKeyDown={this.props.handleInputKeyDown}
              placeholder={this.props.getTrans(this.props.translations.text_4)}
              type="text"
              value={this.props.last_name.value}
              onChange={this.props.last_name.onChange}
            />
          </div>
          <input
              className="fs27"
              onKeyDown={this.props.handleInputKeyDown}
            placeholder={this.props.getTrans(this.props.translations.text_5)}
            type="email"
            value={this.props.email.value}
            onChange={this.props.email.onChange}
          />
          <input
              onKeyDown={this.props.handleInputKeyDown}
              className="fs27"
            placeholder={this.props.getTrans(this.props.translations.text_6)}
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
            {this.props.getTrans(this.props.translations.text_7)}
            <Link 
              style={{ fontSize: 20, color: "#4068a3" }} 
              to={{ pathname: "/terms_and_conditions", 
              state: { backPathname: "/register" } }}
              >
                {this.props.getTrans(this.props.translations.text_8)}
            </Link>
              {this.props.getTrans(this.props.translations.text_9)}
            </p>
            {this.props.loading && this.props.getTrans(this.props.common.loading)}
            {!this.props.loading && <button className={
              clicklable
                ? "button__style "
                : "button__style not-filled"
            }>{this.props.getTrans(this.props.translations.text_12)}</button>}
          </div>
        </form>
         
      </React.Fragment>
    );
  }
}

export default RegisterForm;
