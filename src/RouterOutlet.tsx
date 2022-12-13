import React from "react";
import {useRouter} from "Router";
import {routeTest} from "route-test";


const RouterOutlet = () => {
  const {url, routes} = useRouter();
  const current = routes.find(child => {
    // return new RegExp('^' + child.path + '$').test(url);
    const result = routeTest(url, child.path, {});
    return !!result;
  });
  const el = current ? current.element() : <div>Route not found</div>;
  // if (el instanceof Promise) {
  //   el.then(el2 => {
  //
  //   });
  // }
  return (
    <div id="outlet">{el}</div>
  );
}

export default RouterOutlet
