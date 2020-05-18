import React from "react";
import { GridContainer } from "react-foundation";
import styled from "styled-components";
import arrow from "../../utils/images/arrow.jpeg";

export default (props) => {
  return (
    <GridContainer>
      <Header>
        <Arrow alt="" src={arrow} />
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
`;
