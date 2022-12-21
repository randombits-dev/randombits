import React, {createContext, useContext, useEffect, useState} from "react";
import {routeTest} from "router/route-test";
import {importRemote} from "import-remote";


export interface IRoute {
  path: string;
  element: JSX.Element;
  title?: string;
  remote?: string;
}

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

  const [current, setCurrent] = useState<IRoute>(null);
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    // setCurrent(prevCurrent => {
    const newCurrent = routes.find(child => {
      return routeTest(newUrl, child.path);
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
          console.log('set remote route: ' + newCurrent.title);
          setCurrent(newCurrent);
          document.title = newCurrent.title;
        }).catch(() => {
          // alert('could not load: ' + appName);
        });
      } else {
        console.log('set route: ' + newCurrent.title);
        setCurrent(newCurrent);
        document.title = newCurrent.title;
      }

    }

    return newCurrent;
    // });
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
    <RouterContext.Provider value={{url, routes, current, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
