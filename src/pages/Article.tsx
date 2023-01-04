import {useRouter} from "router/Router";
import RemoteApp from "components/RemoteApp";

const Article = () => {
  const {params} = useRouter();
  return (
    <RemoteApp appName="markdown" params={{article: params.id}}/>
  );
}

export default Article
