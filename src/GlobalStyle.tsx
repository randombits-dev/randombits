import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Open Sans";
    margin: 0;
    background-color: #eff1f4;
    color: #444;
    overflow-y: scroll; // keeps things in same position in pages that are less than 100% height
  }

  h2 {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #26A69C;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`
