import React from 'react';
import {useRouter} from "router/Router";
import RemoteApp from "RemoteApp";

const Article = () => {
  const {params} = useRouter();
  return (
    <RemoteApp appName="blog" params={{type: 'article', name: params.id}}/>
  );
}

export default Article
