/**
 * Note: Don't import/export all Views directly, use lazy loading!
 */
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withSuspense } from '../components';
import NotFound from './NotFound';
import Search from './Search'

/**
 * Views/Pages with Lazy Loading
 */
const Main = withSuspense(
  React.lazy(() => import('./Main')),
  <LinearProgress />
);
const About = withSuspense(React.lazy(() => import('./About')));

export { NotFound, Main, About, Search };
