import {Route, Routes} from "react-router-dom";
import MainPage from "MainPage";
import Header from "Header";
import MicroFrontendAngular from "MicroFrontendAngular";
import MicroFrontendReact from "MicroFrontendReact";

const {REACT_APP_REACT, REACT_APP_ANGULAR} = process.env;

const ReactApp = () => {
  return <MicroFrontendReact appId="react" url={REACT_APP_REACT}></MicroFrontendReact>;
};

const AngularApp = () => {
  return <MicroFrontendAngular appId="angular" url={REACT_APP_ANGULAR}></MicroFrontendAngular>;
};

const BothApps = () => {
  return <>
    <ReactApp/>
    <AngularApp/>
  </>
};

function App() {
  return <>
    <Header/>
    <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="/react" element={<ReactApp/>}></Route>
      <Route path="/angular" element={<AngularApp/>}></Route>
      <Route path="/both" element={<BothApps/>}></Route>
    </Routes>
  </>;
}

export default App;
