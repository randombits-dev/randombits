import React, {useEffect} from 'react';
import styled from "styled-components";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'micro-react': any;
    }
  }
}

interface Params {
  appId: string;
  url: string;
}

const FrontendContainer = styled.div`
  border: 1px dashed #555;
  padding: 20px;
  margin: 20px 0;
`;

const MicroFrontendReact = ({appId, url}: Params) => {
  const scriptName = 'app_script_' + appId;

  useEffect(() => {
    if (!document.getElementById(scriptName)) {
      fetch(`${url}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => {
          const script = document.createElement('script');
          script.id = scriptName;
          script.crossOrigin = '';
          script.src = `${url}${manifest.files['main.js']}`;
          document.head.appendChild(script);
        });
    }
  }, []);

  return (
    <>
      <div>The following is being pulled from {url}:</div>
      <FrontendContainer>
        <micro-react></micro-react>
      </FrontendContainer>
    </>
  );
}

export default MicroFrontendReact
