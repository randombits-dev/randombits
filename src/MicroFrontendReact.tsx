import React, {useEffect} from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'randombits-blog': any;
    }
  }
}

interface Params {
  appId: string;
  url: string;
}

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
      <randombits-blog></randombits-blog>
    </>
  );
}

export default MicroFrontendReact
