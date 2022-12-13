import React, {createContext, useContext, useEffect, useState} from "react";
import MainPage from "MainPage";
import Tools from "Tools";
import Blog from "Blog";

const ROUTES = [
  {path: '/', element: () => <MainPage/>},
  // {path: '/blog/.*', element: () => <Blog/>},
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

  const navigate = (newUrl) => {
    setUrl(newUrl);

    // use timeout so it doesn't interfere with react render
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("[container] navigated", {
          detail: newUrl
        } as any)
      );
    });
  };

  // const current = cloneElement(children.find(child => child.props.path === url) || <div>No route found</div>);

  const onPopState = () => {
    navigate(location.pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    }
  }, []);

  return (
    <RouterContext.Provider value={{url, routes: ROUTES, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
