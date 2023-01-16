import {ReactNode} from 'react';
import styled from "styled-components";
import {useRouter} from "router/Router";

interface Params {
  onClick?: () => void;
  url?: string;
  children: ReactNode;
}

const Button = styled.button`
  padding: 10px 20px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 0;
  font-size: 16px;
  color: inherit;
`;

const ActionButton = ({onClick, url, children}: Params) => {
  const {navigate} = useRouter();
  const handleClick = () => {
    onClick && onClick();
    url && navigate(url);
  };
  return (
    <Button onClick={handleClick}>{children}</Button>
  );
}

export default ActionButton
