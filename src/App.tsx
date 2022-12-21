import {GlobalStyle} from "./GlobalStyle";
import Header from "Header";
import Router, {IRoute} from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import React from "react";
import HomePage from "HomePage";
import RemoteApp from "RemoteApp";
import Tools from "Tools";

import './index.scss';
import Footer from "Footer";
import styled from "styled-components";
import Puzzles from "Puzzles";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  //justify-content: space-between;
`;

// const SnowrunnerRoute = React.lazy(() => import('./Snowrunner'));

const ROUTES: IRoute[] = [
  {path: '/', element: <HomePage/>, title: 'Random Bits'},
  {
    path: '/articles/*',
    element: <RemoteApp key="blog" appName="blog" params={{basename: "/articles"}}/>,
    title: 'Random Bits - Articles',
    remote: 'blog'
  },
  {
    path: '/tools/snowrunner',
    element: <RemoteApp key="snowrunner" appName="snowrunner"/>,
    title: 'Random Bits - Snowrunner Save Editor',
    remote: 'snowrunner'
  },
  {path: '/tools', element: <Tools/>, title: 'Random Bits - Tools'},
  {path: '/puzzles', element: <Puzzles/>, title: 'Random Bits - Puzzles'}
];
const App = () => {
  return <Router routes={ROUTES}>
    <GlobalStyle/>
    <AppContainer>

      <Header/>
      <RouterOutlet/>
      <Footer/>
    </AppContainer>
  </Router>;
}

export default App;
