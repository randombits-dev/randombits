import {useRouter} from "router/Router";
import styled from "styled-components";

interface Params {
  path: string;
  children: any;
}

const LinkContainer = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Link = ({path, children}: Params) => {

  const {navigate} = useRouter();

  const goTo = (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <LinkContainer href={path} onClick={goTo}>{children}</LinkContainer>
  );
}

export default Link
