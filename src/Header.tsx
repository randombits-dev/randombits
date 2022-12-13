import styled from 'styled-components';

import React from "react";

import Link from "Link";

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
    <Link path="/"><AppLink>Home</AppLink></Link>
    <Link path="/blog"><AppLink>Blog</AppLink></Link>
    <Link path="/tools"><AppLink>Tools</AppLink></Link>
  </HeaderContainer>
};

export default Header
