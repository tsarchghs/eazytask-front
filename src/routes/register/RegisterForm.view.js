import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

export default (props) => {
  return (
    <React.Fragment>
      <div className="mobile__welcome">
        <h5>Welcome to eazytask</h5>
        <p>Please fill informations </p>
      </div>
      <form className="register__form" onSubmit={props.onSubmit}>
        <div className="register__form--flex">
          <input
            type="text"
            placeholder="First name"
            value={props.first_name.value}
            onChange={props.first_name.onChange}
          />
          <input
            type="text"
            placeholder="Last name"
            value={props.last_name.value}
            onChange={props.last_name.onChange}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
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
        <div className="register__button">
          <p>
            By clicking next I confirm that I read and understood all the
            <a href="#"> Terms & Conditions</a> of eazytask
          </p>
          <button
            className={
              Boolean(props.last_name.value) &&
              Boolean(props.first_name.value) &&
              Boolean(props.email.value) &&
              Boolean(props.password.value)
                ? "button__style "
                : "button__style not-filled"
            }
          >
            Register
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
