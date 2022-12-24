import React from "react";
import styled from "styled-components";
import Link from "router/Link";

const ToolsContainer = styled.div`

`;

const Tool = styled.div`
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ToolText = styled.div`
  padding: 20px 40px;
  font-size: 18px;
  text-align: center;
`;

const MoreComingSoon = styled.div`
  margin-top: 50px;
`;

const Tools = () => {
  return (
    <ToolsContainer>

      <Link path="/tools/snowrunner">
        <Tool>
          <img src="https://assets1.ignimgs.com/2020/04/23/snowrunner---button-fin-1587603559932.jpg?width=75" alt="Snowrunner Logo"/>
          <ToolText>Snowrunner Save Editor</ToolText>
        </Tool>
      </Link>

      <MoreComingSoon>More coming soon...</MoreComingSoon>
    </ToolsContainer>
  );
}

export default Tools
