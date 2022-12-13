// import MainPage from "MainPage";
// import Header from "Header";
// import MicroFrontendReact from "MicroFrontendReact";
//
// const {REACT_APP_BLOG} = process.env;

// const BlogApp = () => {
//   return <MicroFrontendReact appId="blog" url={REACT_APP_BLOG}></MicroFrontendReact>;
// };
// import {lazy} from "preact/compat";

import {GlobalStyle} from "./GlobalStyle";
import Header from "Header";
import Router from "Router";
import RouterOutlet from "RouterOutlet";
import React from "react";

const App = () => {
  // const loadBlog = () => {
  //   import ('./Blog');
  // };

  return <Router>
    <GlobalStyle/>
    <Header></Header>
    <div>Yo</div>
    <RouterOutlet/>
  </Router>;
}

export default App;
