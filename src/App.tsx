import {Route, Routes} from "react-router-dom";
import MainPage from "MainPage";
import Header from "Header";
import MicroFrontendReact from "MicroFrontendReact";

const {REACT_APP_BLOG} = process.env;

const BlogApp = () => {
  return <MicroFrontendReact appId="blog" url={REACT_APP_BLOG}></MicroFrontendReact>;
};

function App() {
  return <>
    <Header/>
    <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="/blog" element={<BlogApp/>}></Route>
    </Routes>
  </>;
}

export default App;
