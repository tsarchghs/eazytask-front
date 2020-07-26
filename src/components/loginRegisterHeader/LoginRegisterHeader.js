import React from "react";
import { GridContainer } from "react-foundation";
import styled from "styled-components";
import arrow from "../../utils/images/arrow.jpeg";
import { Link, withRouter } from "react-router-dom";

const LoginRegisterHeader = props => {
  return (
    <header>
      <span onClick={e => {
        props.history.push("/")
      }} class="show__mobile"><img src="/images/arrow.jpeg" alt="" /></span>
      <img onClick={() => props.history.push("/")} style={{ cursor: "pointer" }} class="logo__img" src="/images/logo.svg" alt="" />
    </header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 30px;
  @media (max-width: 768px) {
    justify-content: center;
    padding-top: 20px;
  }
`;

const Arrow = styled.img`
  width: 30px;
  margin-right: 25px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 150px;
   @media (max-width: 768px) {
     width: 100px;
   }
`;

export default withRouter(LoginRegisterHeader);