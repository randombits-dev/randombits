import styled from "styled-components";
import ActionButton from "components/ActionButton";
import Link from "router/Link";
import ArticleListVertical from "pages/ArticleListVertical";

const FeaturedContent = styled.div`
  display: flex;
`;

const Heading = styled.div`
  font-size: 18px;
  padding-bottom: 20px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;
`;

const LatestArticles = styled.div`
  padding: 20px 0;
`;

const PopularTools = styled.div`
  min-width: 250px;
  margin-left: 50px;
  border-left: 1px solid #ccc;
  padding-left: 50px;
`;

const MicroInfo = styled.div`
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 30px 0;
`;

const MicroText = styled.div`
  padding: 20px 0;
`;

const Bio = styled.div`
  border-top: 1px solid #ccc;
  text-align: center;
  padding: 30px 0;
`;

const BioText = styled.div`
  padding: 20px 0;
`;

const HomePage = () => {

  return (
    <div>
      <FeaturedContent>
        <LatestArticles>
          <Heading>- Latest Articles -</Heading>
          {/*<RemoteApp appName="blog"/>*/}
          <ArticleListVertical limit={5}/>
        </LatestArticles>
        <PopularTools>
          <Heading>- Featured Tools -</Heading>
          <Link path="/tools/snowrunner">Snowrunner Save Editor</Link>
        </PopularTools>
      </FeaturedContent>
      {/*TODO:<Bio>*/}
      {/*  <BioText>Hi, I'm Matthew. Welcome to my hobby site. I love coding, puzzles, and video games.</BioText>*/}
      {/*  <ActionButton onClick={() => {*/}
      {/*  }}>About Me</ActionButton>*/}
      {/*</Bio>*/}
      <MicroInfo>
        <div>
          <img src="/micro.png" alt=""/>
        </div>
        <MicroText>This website is built with micro frontends, using module federation.</MicroText>
        <div>
          <Link path="/micro-frontend"><ActionButton onClick={() => {
          }}>Learn More</ActionButton></Link>
        </div>
      </MicroInfo>
    </div>
  );
}

export default HomePage
