import React from "react";

import {useRouter} from "router/Router";

interface Params {
  path: string;
  children: any;
}

const Link = ({path, children}: Params) => {

  const {navigate} = useRouter();

  const goTo = (e) => {
    e.preventDefault();
    window.history.pushState({}, null, path);
    navigate(path);
  };

  return (
    <a href={path} onClick={goTo}>{children}</a>
  );
}

export default Link
