import {IRoute} from 'router/Router';
import HomePage from 'pages/HomePage';
import Tools from 'pages/Tools';
import Puzzles from 'pages/Puzzles';
import MicroFrontend from "pages/MicroFrontend";
import ArticleListVertical from "pages/ArticleListVertical";
import Article from "pages/Article";

export const ROUTES: IRoute[] = [
  {path: '/', element: <HomePage/>, remote: 'markdown', title: 'Random Bits'},
  {
    path: '/articles',
    title: 'Random Bits - Articles',
    element: <ArticleListVertical/>
  },
  {
    path: '/article/:id',
    title: 'Random Bits - Articles',
    remote: 'markdown',
    element: <Article/>
  },
  {
    path: '/micro-frontend',
    title: 'Random Bits - Micro Frontend',
    element: <MicroFrontend/>,
    remote: 'markdown'
  },
  {
    path: '/tools/snowrunner',
    title: 'Random Bits - Snowrunner Save Editor',
    remote: 'snowrunner'
  },
  {
    path: '/tools/image',
    title: 'Random Bits - Image Generation',
    remote: 'diffusion'
  },
  {path: '/tools', element: <Tools/>, title: 'Random Bits - Tools'},
  {path: '/puzzles', element: <Puzzles/>, title: 'Random Bits - Puzzles'}
];
