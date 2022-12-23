import React from "react";
import {IRoute, useRouter} from "router/Router";
import styled from "styled-components";
import RemoteApp from "RemoteApp";

const OutletContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const getElementToRender = (current: IRoute) => {
  if (current) {
    if (current.element) {
      return current.element;
    } else if (current.remote) {
      return <RemoteApp key={current.path} appName={current.remote} params={current.params}/>;
    }
  }
  return <div>Route not found (container)</div>;
};

const RouterOutlet = () => {
  const {current} = useRouter();
  return (
    <OutletContainer id="outlet">{getElementToRender(current)}</OutletContainer>
  );
}

export default RouterOutlet
