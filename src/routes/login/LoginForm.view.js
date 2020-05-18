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
        <div className="register__button">
          <a href="#">Trouble loging in?</a>
          <button className="button__style">Join us</button>
        </div>
      </form>
    </React.Fragment>
  );
};
