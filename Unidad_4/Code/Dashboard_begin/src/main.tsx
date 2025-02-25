import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { loadUserByIndex, loadUsers } from '@api/user';

import Users from '@pages/users';
import UserView from '@pages/users/view';
import ErrorUser from '@pages/users/error';

import Home from '@pages/home/index.tsx';

import Layout from '@components/Layout.tsx';

import './index.css';

// Crear el BrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'users/view/:index',
        loader: ({ params }) => {
          return loadUserByIndex(Number(params.index));
        },
        element: <UserView />,
      },
      {
        path: 'users/:state?',
        loader: ({ params }) => {
          console.log('Params from users/:state?', params);
          return loadUsers(params.state);
        },
        element: <Users />,
        errorElement: <ErrorUser />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Añadir el RouterProvider con el router */}
    <RouterProvider router={router} />
  </StrictMode>
);
