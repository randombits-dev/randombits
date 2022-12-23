import {IRoute} from 'router/Router';
import HomePage from 'HomePage';
import Tools from 'Tools';
import Puzzles from 'Puzzles';
import React from 'react';
import MicroFrontend from "MicroFrontend";
import ArticleListVertical from "ArticleListVertical";
import Article from "Article";

export const ROUTES: IRoute[] = [
  {path: '/', element: <HomePage/>, remote: 'blog', title: 'Random Bits'},
  {
    path: '/articles',
    title: 'Random Bits - Articles',
    element: <ArticleListVertical/>
  },
  {
    path: '/article/:id',
    title: 'Random Bits - Articles',
    remote: 'blog',
    element: <Article/>,
    params: {
      type: 'article',
      name: 'one'
    }
  },
  {
    path: '/micro-frontend',
    title: 'Random Bits - Micro Frontend',
    element: <MicroFrontend/>,
    remote: 'blog',
    params: {
      page: 'micro-frontend'
    }
  },
  {
    path: '/tools/snowrunner',
    title: 'Random Bits - Snowrunner Save Editor',
    remote: 'snowrunner'
  },
  {path: '/tools', element: <Tools/>, title: 'Random Bits - Tools'},
  {path: '/puzzles', element: <Puzzles/>, title: 'Random Bits - Puzzles'}
];
