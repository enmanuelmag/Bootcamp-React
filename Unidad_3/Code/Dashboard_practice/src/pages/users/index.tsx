import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserLoaderDataType } from '@customTypes/user';

import UserProfile from '@components/UserProfile';

function Users() {
  const data = useLoaderData() as UserLoaderDataType;

  console.log(data);

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuarios</p>
      }
    >
      <Await resolve={data.users}>
        {(users: UserLoaderDataType['users']) => (
          <section className="cd-flex cd-flex-row cd-flex-wrap cd-justify-center">
            {users.map((user) => (
              <UserProfile key={user.name} {...user} />
            ))}
          </section>
        )}
      </Await>
    </React.Suspense>
  );
}

export default Users;
