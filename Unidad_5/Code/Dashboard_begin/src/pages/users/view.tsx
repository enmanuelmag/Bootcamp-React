import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserByIdLoaderDataType } from '@customTypes/user';

import UserProfile from '@components/UserProfile';

const UserView = () => {
  const data = useLoaderData() as UserByIdLoaderDataType;

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuario</p>
      }
    >
      <Await resolve={data.user}>
        {(user) =>
          user && <UserProfile key={`profile-${user.id}`} data={user} />
        }
      </Await>
    </React.Suspense>
  );
};

export default UserView;
