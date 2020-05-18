import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

export default (props) => {
  return (
    <React.Fragment>
      <form className="register__form" onSubmit={props.onSubmit}>
        {props.errors.map((x) => (
          <div>{x}</div>
        ))}
        <div className="register__form--flex">
          <input
            placeholder="First name"
            value={props.first_name.value}
            onChange={props.first_name.onChange}
          />
          <input
            placeholder="Last name"
            value={props.last_name.value}
            onChange={props.last_name.onChange}
          />
        </div>
        <input
          placeholder="Email"
          value={props.email.value}
          onChange={props.email.onChange}
        />
        <input
          placeholder="Password"
          value={props.password.value}
          onChange={props.password.onChange}
        />
        <div className="register__button">
          <a href="#">Trouble loging in?</a>
          <button className="button__style">Register</button>
        </div>
      </form>
    </React.Fragment>
  );
};
