import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DataRepo from '@api/datasource';

import { UserLoaderDataType, UserType } from '@customTypes/user';

import { QKeys } from '@constants/query';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';
import { usePagination } from '@hooks/pagination';
import { Pagination } from '@components/shared/Pagination';

function Users() {
  const { state } = useParams<{ state: string }>();

  const usersQuery = useQuery<
    UserLoaderDataType,
    Error,
    UserLoaderDataType,
    [string, string | undefined]
  >({
    queryKey: [QKeys.GET_USERS, state],
    queryFn: ({ queryKey }) => {
      return DataRepo.loadUsers(queryKey[1]);
    },
  });

  //const data = useLoaderData() as UserLoaderDataType;

  const { data } = usersQuery;

  const isLoading = isLoadingOrRefetchQuery(usersQuery);

  const { currentPage, pageData, totalPages, goToPage } =
    usePagination<UserType>({ data: data?.users });

  return (
    <React.Fragment>
      {isLoading && (
        <p className="cd-text-2xl cd-font-bold cd-text-center">
          Cargando usuarios
        </p>
      )}
      {!isLoading && data && (
        <div>
          <div className="cd-flex cd-flex-col cd-gap-y-4 cd-w-[50rem] cd-text-center">
            <h1 className="cd-text-4xl cd-font-bold">Usuarios</h1>
            <p className="cd-text-lg">
              {data.users.length === 0
                ? 'No hay usuarios'
                : `Hay ${data.users.length} usuarios`}
            </p>
          </div>
          <Pagination<UserType>
            currentPage={currentPage}
            data={pageData}
            onChange={goToPage}
            totalPages={totalPages}
            renderItem={(user, index) => (
              <UserProfile key={`user-${index}`} {...user} />
            )}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default Users;
