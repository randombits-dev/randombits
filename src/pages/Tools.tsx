import styled from "styled-components";
import Link from "router/Link";

const ToolsContainer = styled.div`

`;

const ToolContainer = styled.div`
  padding: 10px 0;
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

const TOOLS = [
  {
    title: 'Snowrunner Save Editor',
    img: 'https://assets1.ignimgs.com/2020/04/23/snowrunner---button-fin-1587603559932.jpg?width=100',
    link: '/tools/snowrunner'
  },
  {
    title: 'Image Generation',
    img: 'https://storage.googleapis.com/randombits/images/inkpunk1-100.jpg',
    link: '/tools/image'
  }
]

const Tools = () => {
  return (
    <ToolsContainer>

      {
        TOOLS.map(tool => <ToolContainer>
          <Link path={tool.link}>
            <Tool>
              <img width="100" src={tool.img}/>
              <ToolText>{tool.title}</ToolText>
            </Tool>
          </Link>
        </ToolContainer>)
      }

      <MoreComingSoon>More coming soon...</MoreComingSoon>
    </ToolsContainer>
  );
}

export default Tools
