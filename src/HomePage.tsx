import React from "react";
import styled from "styled-components";
import RemoteApp from "RemoteApp";

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
  //flex: 1 1 auto;
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
          <RemoteApp appName="blog"/>
        </LatestArticles>
        <PopularTools>
          <Heading>- Featured Tools -</Heading>
          <div>Snowrunner Save Editor</div>
        </PopularTools>
      </FeaturedContent>
      {/*TODO:<Bio>*/}
      {/*  <BioText>Hi, I'm Matthew. Welcome to my hobby site. I love coding, puzzles, and video games.</BioText>*/}
      {/*  <ActionButton onClick={() => {*/}
      {/*  }}>About Me</ActionButton>*/}
      {/*</Bio>*/}
      {/*TODO:<MicroInfo>*/}
      {/*  <div>*/}
      {/*    <img src="/micro.png"/>*/}
      {/*  </div>*/}
      {/*  <MicroText>This website is built with micro frontends, using module federation.</MicroText>*/}
      {/*  <div>*/}
      {/*    <ActionButton onClick={() => {*/}
      {/*    }}>Learn More</ActionButton>*/}
      {/*  </div>*/}
      {/*</MicroInfo>*/}
    </div>
  );
}

export default HomePage
