import {GlobalStyle} from "./GlobalStyle";
import Header from "Header";
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";

import './index.scss';
import Footer from "Footer";
import styled from "styled-components";
import {ROUTES} from "router/routes";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

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
