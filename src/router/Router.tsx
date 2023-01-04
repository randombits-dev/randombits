import React, {createContext, useContext, useEffect} from "react";
import {routeTest} from "router/route-test";
import {importRemote} from "utils/import-remote";
import {DEV_MODE} from "../utils/utils";
import {useState} from "preact/hooks";


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

  const updateCurrent = (newCurrent, newParams) => {
    setCurrent(newCurrent);
    setParams(newParams);
    document.title = newCurrent.title;
  };
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    let newParams;
    const newCurrent = routes.find(child => {
      newParams = routeTest(newUrl, child.path);
      return !!newParams;
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
      if (newCurrent.remote && !DEV_MODE) {
        importRemote(newCurrent.remote).then(() => {
          updateCurrent(newCurrent, newParams);
        }).catch((e) => {
          console.error(e);
          updateCurrent(newCurrent, newParams);
        });
      } else {
        updateCurrent(newCurrent, newParams);
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
