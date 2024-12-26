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
        {(users) => (
          <React.Fragment>
            {Boolean(users.length) && (
              <section className="cd-w-full cd-flex cd-flex-row cd-flex-wrap cd-justify-center">
                {users.map((user, index) => (
                  <UserProfile key={user.name} index={index} {...user} />
                ))}
              </section>
            )}

            {!users.length && (
              <p className="text-2xl font-bold text-center">
                No hay usuarios que mostrar
              </p>
            )}
          </React.Fragment>
        )}
      </Await>
    </React.Suspense>
  );
}

export default Users;
