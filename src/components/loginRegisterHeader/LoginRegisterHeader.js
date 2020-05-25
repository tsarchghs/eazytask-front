import React from "react";
import { GridContainer } from "react-foundation";
import styled from "styled-components";
import arrow from "../../utils/images/arrow.jpeg";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <GridContainer>
      <Header>
        <Link to="/">
          <Arrow alt="" src={arrow} />
        </Link>
        <Logo alt="" src="/images/logo.svg" />
      </Header>
    </GridContainer>
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
