import {createContext, h} from "preact";
import {useContext, useEffect, useState} from "preact/hooks";
import MainPage from "MainPage";
import Tools from "Tools";
import Blog from "Blog";

const ROUTES = [
  {path: '/', element: () => <MainPage/>},
  {path: '/blog', element: () => <Blog/>},
  {path: '/tools', element: () => <Tools/>}
];

interface IRouterContext {
  url: string;
  routes: { path: string, element: any }[];
  navigate: (newUrl) => void;
}

const GLOBAL_ROUTE_CONTEXT = {
  url: location.pathname,
  routes: ROUTES,
  navigate: null
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
  return useContext(RouterContext);
};


const Router = ({children}) => {
  const [url, setUrl] = useState(location.pathname);
  console.log('url: ' + url);

  const navigate = (newUrl) => {
    setUrl(newUrl);
  };

  // const current = cloneElement(children.find(child => child.props.path === url) || <div>No route found</div>);
  // console.log(current);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      console.log('change: ' + location.pathname);
      setUrl(location.pathname);
    });
  }, []);

  return (
    <RouterContext.Provider value={{url, routes: ROUTES, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
