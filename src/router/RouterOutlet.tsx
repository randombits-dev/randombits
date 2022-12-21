import React from "react";
import {useRouter} from "router/Router";
import styled from "styled-components";
// import {routeTest} from "route-test";

const OutletContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const RouterOutlet = () => {
  const {current} = useRouter();
  const el = current ? current.element : <div>Route not found (container)</div>;
  return (
    <OutletContainer id="outlet">{el}</OutletContainer>
  );
}

export default RouterOutlet
