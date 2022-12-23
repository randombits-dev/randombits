import React, {createContext, useContext, useEffect, useState} from "react";
import {routeTest} from "router/route-test";
import {importRemote} from "import-remote";


export interface IRoute {
  path: string;
  element?: JSX.Element;
  title?: string;
  remote?: string;
  params?: { [key: string]: any };
  preloadRemote?: string;
}

interface IRouterContext {
  url: string;
  routes: { path: string, element: any }[];
  navigate: (newUrl) => void;
  current: any;
  params: any;
}

const GLOBAL_ROUTE_CONTEXT = {
  url: location.pathname,
  routes: [],
  navigate: null,
  current: null,
  params: {}
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
  return useContext(RouterContext);
};

const Router = ({routes, children}) => {
  const [url, setUrl] = useState(location.pathname);

  const [current, setCurrent] = useState<IRoute>(null);
  const [params, setParams] = useState<any>({});
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    let params;
    const newCurrent = routes.find(child => {
      params = routeTest(newUrl, child.path);
      return !!params;
    });
    if (current === newCurrent) {
      // use timeout so it doesn't interfere with react render
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("[container] navigate", {
            detail: newUrl
          } as any)
        );
      });
    } else if (newCurrent) {
      if (newCurrent.remote) {
        importRemote(newCurrent.remote).then(() => {
          setCurrent(newCurrent);
          setParams(params);
          console.log(params);
          document.title = newCurrent.title;
        }).catch(() => {
          console.error('could not load: ' + newCurrent.remote);
        });
      } else {
        setCurrent(newCurrent);
        setParams(params);
        document.title = newCurrent.title;
      }

    }

    return newCurrent;
  };

  const navigate = (newUrl, skipHistory = false) => {
    if (!skipHistory) {
      window.history.pushState({}, null, newUrl);
    }
    calcRoute(newUrl);
  };

  const onPopState = () => {
    navigate(location.pathname, true);
  };

  const onChildNavigate = (event) => {
    const url = (event as any).detail;
    navigate(url);
  };

  useEffect(() => {
    window.addEventListener('popstate', onPopState);
    window.addEventListener("[child] navigate", onChildNavigate);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener("[child] navigate", onChildNavigate);
    }
  }, [current]);

  useEffect(() => {
    calcRoute(url);
  }, []);

  return (
    <RouterContext.Provider value={{url, routes, current, params, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
