import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Open Sans";
    margin: 0;
    background-color: #eff1f4;
    color: #232;
    overflow-y: scroll; // keeps things in same position in pages that are less than 100% height
  }
`
