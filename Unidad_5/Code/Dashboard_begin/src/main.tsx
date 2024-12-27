import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Users from '@pages/users';
import UserView from '@pages/users/view';
import UserForm from '@pages/users/form';
import ErrorUser from '@pages/users/error';

import Home from '@pages/home/index.tsx';

import Layout from '@components/Layout.tsx';

import './index.css';
import DataRepo from '@api/datasource';

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
        path: 'users/view/:id',
        loader: ({ params }) => {
          return DataRepo.loadUserById(params.id!);
        },
        element: <UserView />,
      },
      {
        path: 'users/form/:index?',
        loader: ({ params }) => {
          return DataRepo.loadUserById(params.id!);
        },
        element: <UserForm />,
      },
      {
        path: 'users/:state?',
        loader: ({ params }) => {
          console.log('Params from users/:state?', params);
          return DataRepo.loadUsers(params.state);
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