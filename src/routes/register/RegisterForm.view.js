import React from "react";
import { Link } from "react-router-dom";
import { GridContainer } from "react-foundation";
import styled from "styled-components";

export default (props) => {
  let clicklable = props.first_name.value && props.last_name.value && props.email.value && props.password.value
  return (
    <React.Fragment>
      <form className="register__form" onSubmit={clicklable ? props.onSubmit : e => e.preventDefault()}>
       <div className="flex-grow">
        <div className="register__form--flex">
          <input
            placeholder="First name"
              type="text"
            value={props.first_name.value}
            onChange={props.first_name.onChange}
          />
          <input
            placeholder="Last name"
            type="text"
            value={props.last_name.value}
            onChange={props.last_name.onChange}
          />
        </div>
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
          {/* <a href="#">Trouble loging in?</a> */}
          {props.loading && "Loading"}
          {!props.loading && <button className={
            clicklable
              ? "button__style "
              : "button__style not-filled"
          }>Register</button>}
        </div>
      </form>
       
    </React.Fragment>
  );
};
