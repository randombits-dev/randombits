import styled from 'styled-components';

import Link from "router/Link";

const HeaderContainer = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;

`;

const HeaderContent = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: baseline;
  background-color: #eff1f4;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  padding-right: 50px;
  letter-spacing: 2px;
  font-weight: 600;
`;

const AppLink = styled.div`
  padding: 0 15px;
  letter-spacing: 2px;
`;

const Header = () => {

  return <HeaderContainer>
    <HeaderContent>
      <Link path="/"><HeaderTitle>Random Bits</HeaderTitle></Link>
      <Link path="/articles"><AppLink>Articles</AppLink></Link>
      <Link path="/tools"><AppLink>Tools</AppLink></Link>
      {/*<Link path="/puzzles"><AppLink>Puzzles</AppLink></Link>*/}
    </HeaderContent>
  </HeaderContainer>
};

export default Header
