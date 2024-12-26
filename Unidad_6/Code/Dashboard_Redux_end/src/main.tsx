import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';

import { store } from '@store/index';

import Layout from './components/Layout';

import Home from './pages/home';

import Users from './pages/users';
import UserView from './pages/users/view';
import UserForm from './pages/users/form';
import ErrorUser from './pages/users/error';

import './index.css';

const queryClient = new QueryClient();
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

        element: <UserView />,
      },
      {
        path: 'users/form/:index?',

        element: <UserForm />,
      },
      {
        path: 'users/:state?',
        element: <Users />,
        errorElement: <ErrorUser />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Añadir el RouterProvider con el router */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
