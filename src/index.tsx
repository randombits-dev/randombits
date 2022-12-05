import React from 'react';
import {createRoot} from "react-dom/client";
import {GlobalStyle} from "GlobalStyle";
import App from "App";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle></GlobalStyle>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
