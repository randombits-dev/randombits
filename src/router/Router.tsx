import React, {createContext, useContext, useEffect, useState} from "react";
import {routeTest} from "router/route-test";


interface IRouterContext {
  url: string;
  routes: { path: string, element: any }[];
  navigate: (newUrl) => void;
  current: any;
}

const GLOBAL_ROUTE_CONTEXT = {
  url: location.pathname,
  routes: [],
  navigate: null,
  current: null
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
  return useContext(RouterContext);
};

const Router = ({routes, children}) => {
  const [url, setUrl] = useState(location.pathname);

  const [current, setCurrent] = useState(null);
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    setCurrent(routes.find(child => {
      return routeTest(newUrl, child.path);
    }));
  };

  const navigate = (newUrl) => {
    calcRoute(newUrl);
    // use timeout so it doesn't interfere with react render
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("[container] navigated", {
          detail: newUrl
        } as any)
      );
    });
  };

  const onPopState = () => {
    navigate(location.pathname);
  };

  useEffect(() => {
    calcRoute(url);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    }
  }, []);

  return (
    <RouterContext.Provider value={{url, routes, current, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
