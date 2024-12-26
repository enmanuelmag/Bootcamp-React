import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DataRepo from '@api/datasource';

import { UserLoaderDataType, UserType } from '@customTypes/user';

import { QKeys } from '@constants/query';

import { useDebounce } from '@hooks/input';
import { usePagination } from '@hooks/pagination';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';
import { Pagination } from '@components/shared/Pagination';
import Input from '@components/form/Input';

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

  const { data } = usersQuery;

  //const data = useLoaderData() as UserLoaderDataType;

  const [query, debouncedQuery, setQuery, debouncing] = useDebounce<string>(
    '',
    1000
  );

  const filterUserCallback = React.useCallback(filterUsers, [
    debouncedQuery,
    data?.users,
  ]);

  const isLoading = isLoadingOrRefetchQuery(usersQuery);

  const { currentPage, pageData, totalPages, goToPage } =
    usePagination<UserType>({ data: filterUserCallback() });

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

          <Input label="Buscar usuario" value={query} onChange={setQuery} />

          {debouncing && (
            <p className="cd-text-lg cd-text-center">Buscando...</p>
          )}

          {!debouncing && (
            <Pagination<UserType>
              currentPage={currentPage}
              data={pageData}
              onChange={goToPage}
              totalPages={totalPages}
              renderItem={(user, index) => (
                <UserProfile key={`user-${index}`} {...user} />
              )}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );

  function filterUsers() {
    //Buscamos en toda la data, no solo en la pageData
    if (!data?.users.length || !debouncedQuery) {
      return data?.users;
    }

    return data.users.filter((user) =>
      user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }
}

export default Users;
