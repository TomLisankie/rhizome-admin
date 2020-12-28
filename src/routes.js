import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import PageListView from 'src/views/pages/PageListView';
import AnalyticsView from 'src/views/analytics/AnalyticsView';
import NotFoundView from 'src/views/errors/NotFoundView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'pages', element: <PageListView /> },
      { path: 'analytics', element: <AnalyticsView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/pages" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
