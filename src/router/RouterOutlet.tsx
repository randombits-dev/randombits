import React from "react";
import {useRouter} from "router/Router";
// import {routeTest} from "route-test";


const RouterOutlet = () => {
  const {current} = useRouter();
  const el = current ? current.element : <div>Route not found (container)</div>;
  return (
    <div id="outlet">{el}</div>
  );
}

export default RouterOutlet
