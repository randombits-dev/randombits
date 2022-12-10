import { h } from "preact";
import {useRouter} from "Router";

interface Params {
  path: string;
  children: any;
}

const Link = ({path, children}: Params) => {

  const {navigate} = useRouter();

  const goTo = (e) => {
    e.preventDefault();
    window.history.pushState({}, null, path);
    navigate(path);
  };

  return (
    <a href={path} onClick={goTo}>{children}</a>
  );
}

export default Link
