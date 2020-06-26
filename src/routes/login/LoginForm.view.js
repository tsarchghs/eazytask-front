import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

export default (props) => {
  return (
    <React.Fragment>
      <div className="mobile__welcome">
        <h5>Welcome back</h5>
        <p>Please fill the informations</p>
      </div>
      <form className="register__form" onSubmit={Boolean(props.email.value) && Boolean(props.password.value) ? props.onSubmit : e => e.preventDefault()}>
        <div className="flex-grow"> 
        <input
          placeholder="Email"
          type="email"
          value={props.email.value}
          onChange={props.email.onChange}
        />
        <input
          placeholder="Password"
          type="password"
          value={props.password.value}
          onChange={props.password.onChange}
        />
        {props.errors.map((x) => (
          <div class="register__form--error">{x}</div>
        ))}
        </div>
        <div className="register__button">
        
          <Link to="/forget_password">Trouble loging in?</Link>
          { props.loading && "Loading"}
          { !props.loading && 
              <button
                className={
                  Boolean(props.email.value) && Boolean(props.password.value)
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
};
