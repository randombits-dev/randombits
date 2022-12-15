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
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import React from "react";
import MainPage from "MainPage";
import Blog from "Blog";
import Tools from "Tools";

const ROUTES = [
  {path: '/', element: <MainPage/>},
  // {path: '/blog/.*', element: () => <Blog/>},
  {path: '/blog/*', element: <Blog/>},
  {path: '/tools', element: <Tools/>}
];
const App = () => {
  // const loadBlog = () => {
  //   import ('./Blog');
  // };

  return <Router routes={ROUTES}>
    <GlobalStyle/>
    <Header></Header>
    <div>Yo</div>
    <RouterOutlet/>
  </Router>;
}

export default App;
