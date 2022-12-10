import {h} from 'preact';
import {useRouter} from "Router";


const RouterOutlet = () => {
  const {url, routes} = useRouter();
  const current = routes.find(child => child.path === url);
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
