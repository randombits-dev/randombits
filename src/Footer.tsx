import styled from "styled-components";

const FooterContainer = styled.footer`
  margin-top: 30px;
  border-top: 1px solid #ccc;
  //background-color: #b2dfdb;
  padding: 20px 0;
`;

const FooterContent = styled.div`
  display: flex;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
`;

const SocialLinks = styled.div`
  display: flex;
  padding: 10px;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const NavigationLinks = styled.div`
  padding: 10px;
`;

const NavigationLink = styled.div`
  display: block;
`;

const OtherInfo = styled.div`
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialLink href="https://github.com/nienow">
            <img src="/github.svg" alt="Github Link" width="30px"/>
          </SocialLink>
          {/*TODO:<SocalLink href="https://twitter.com/randombits">Twitter</SocalLink>*/}
        </SocialLinks>
        {/*<NavigationLinks>*/}
        {/*TODO:<NavigationLink><Link path="/about">About Me</Link></NavigationLink>*/}
        {/*TODO:<NavigationLink><Link path="/micro">Micro Frontends</Link></NavigationLink>*/}
        {/*<NavigationLink><Link path="/blog">Blog</Link></NavigationLink>*/}
        {/*<NavigationLink><Link path="/tools">Tools</Link></NavigationLink>*/}
        {/*TODO:<NavigationLink><Link path="/puzzles">Puzzles</Link></NavigationLink>*/}

        {/*</NavigationLinks>*/}
      </FooterContent>
      <OtherInfo>&copy; 2023 Matthew Nienow</OtherInfo>
      {/*TODO:<OtherInfo>Source code for this site: <a*/}
      {/*  href="https://www.github.com/nienow/randombits-container">https://www.github.com/nienow/randombits-container</a></OtherInfo>*/}
    </FooterContainer>
  );
}

export default Footer
