import React, {useEffect} from 'react';
import styled from "styled-components";
import {loadScript} from "script-loader";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'micro-angular': any;
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

const MicroFrontend = ({appId, url}: Params) => {
  useEffect(() => {
    if (!document.getElementById(`app_script_${appId}_runtime`)) {
      loadScript(`app_script_${appId}_runtime`, `${url}/runtime.js`);
      loadScript(`app_script_${appId}_main`, `${url}/main.js`);
      loadScript(`app_script_${appId}_polyfills`, `${url}/polyfills.js`);
    }
  }, []);

  // @ts-ignore:start
  return (
    <>
      <div>The following is being pulled from {url}:</div>
      <FrontendContainer>
        <micro-angular></micro-angular>
      </FrontendContainer>
    </>
  );
  // @ts-ignore:end
}

export default MicroFrontend
