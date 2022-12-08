import styled from 'styled-components';
import React from "react";
import {Link} from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  padding-right: 50px;
`;

const AppLink = styled.div`
  padding: 5px;
`;

const Header = () => {
  return <HeaderContainer>
    <HeaderTitle>Random Bits</HeaderTitle>
    <Link to="/blog"><AppLink>Blog</AppLink></Link>
    <Link to="/tools"><AppLink>Tools</AppLink></Link>
  </HeaderContainer>
}

export default Header
