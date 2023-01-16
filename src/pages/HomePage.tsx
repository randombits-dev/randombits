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
  padding-top: 20px;
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

const PopularTool = styled.h2`
  padding: 5px 0;
  margin: 0;
`;
const ToolImage = styled.img`
  margin: 5px;
`;

const SeeAllTools = styled.div`
  margin-top: 20px;
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
        {/*<PopularTools>*/}
        {/*  <Heading>- Featured Tools -</Heading>*/}
        {/*  <Link path="/tools/snowrunner"><PopularTool>Snowrunner Save Editor</PopularTool></Link>*/}
        {/*  <Link path="/tools/image"><PopularTool>Image Generation</PopularTool></Link>*/}
        {/*  <SeeAllTools><ActionButton url="/tools">See All Tools</ActionButton></SeeAllTools>*/}
        {/*</PopularTools>*/}
        <PopularTools>
          <Heading>- Featured Tools -</Heading>
          <Link path="/tools/snowrunner"><ToolImage
            src="https://assets1.ignimgs.com/2020/04/23/snowrunner---button-fin-1587603559932.jpg?width=100" width="100"/></Link>
          <Link path="/tools/image"><ToolImage src="https://storage.googleapis.com/randombits/images/inkpunk1-100.jpg"
                                               width="100"/></Link>
          <SeeAllTools><ActionButton url="/tools">See All Tools</ActionButton></SeeAllTools>
        </PopularTools>
      </FeaturedContent>
      {/*TODO:<Bio>*/}
      {/*  <BioText>Hi, I'm Matthew. Welcome to my hobby site. I love coding, puzzles, and video games.</BioText>*/}
      {/*  <ActionButton onClick={() => {*/}
      {/*  }}>About Me</ActionButton>*/}
      {/*</Bio>*/}
      <MicroInfo>
        <div>
          <img src="https://storage.googleapis.com/randombits/images/micro.png" alt=""/>
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
