import React from 'react';
import { About, NotFound, Search } from './views';
import { AppIcon } from './components';

export const TITLE_PUBLIC = 'Unstoppable Domains for Not Logged User';
export const TITLE_PRIVATE = 'Unstoppable Domains';

export const ROWS_PER_PAGE = 25; // Amount of rows per single page in tables and grids

/**
 * Single source of truth for Pages/Views of the App
 * Used for Routing, in SideBar and TopBar, and so on
 */
export const PAGES = [
  {
    // Default page mapping
    exact: true,
    // Don't set href for '/' url, .href is used to find current Title in the TopBar component
    path: '/',
    component: Search, // Change to most frequently used view
  },
  {
    showInSidebar: true,
    title: 'Search',
    href: '/search',
    path: '/search',
    component: Search,
    icon: <AppIcon icon="search" />,
  },
  {
    showInSidebar: true,
    title: 'About',
    href: '/about',
    path: '/about',
    component: About,
    icon: <AppIcon icon="info" />,
  },
  {
    title: 'Page does not exist',
    component: NotFound,
  },
];
