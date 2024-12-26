import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { UserLoaderData } from '@customTypes/user';

import { QKeys } from '@constants/query';

import DataRepo from '@api/datasource';

import { usePagination } from '@hooks/pagination';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';
import { Pagination } from '@components/Pagination';
import { useDebounce } from '@hooks/input';
import Input from '@components/Form/Input';

function Users() {
  const usersQuery = useQuery<UserLoaderData, Error, UserLoaderData>({
    queryKey: [QKeys.GET_USERS],
    queryFn: async () => {
      return await DataRepo.loadUsers();
    },
  });

  const { data } = usersQuery;

  const isLoading = isLoadingOrRefetchQuery(usersQuery);

  const [query, debouncedQuery, setQuery, debouncing] = useDebounce<string>(
    '',
    1000
  );

  const filterUserCallback = React.useCallback(filterUsers, [
    debouncedQuery,
    data?.users,
  ]);

  const { page, pageData, goToPage, totalPages } = usePagination({
    data: filterUserCallback(),
    pageSize: 2,
  });

  return (
    <React.Fragment>
      {isLoading && (
        <p className="text-2xl font-bold text-center">Cargando usuarios</p>
      )}
      {!isLoading && data && (
        <div>
          <div className="flex flex-col gap-y-4 w-[50rem] text-center">
            <h1 className="text-4xl font-bold">Usuarios</h1>
            <p className="text-lg">
              {data.users.length === 0
                ? 'No hay usuarios'
                : `Hay ${data.users.length} usuarios`}
            </p>
          </div>

          <Input
            label="Buscar usuario"
            value={query}
            inputProps={{
              onChange: (e) => setQuery(e.target.value),
            }}
          />

          {debouncing && (
            <p className="text-2xl font-bold text-center">Buscando...</p>
          )}

          {!debouncing && (
            <Pagination
              currentPage={page}
              data={pageData}
              onChange={goToPage}
              renderItem={(user, index) => (
                <UserProfile key={index} {...user} index={index + page} />
              )}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );

  function filterUsers() {
    if (!data?.users.length || !debouncedQuery) {
      return data?.users;
    }

    const filteredUsers = data.users.filter((user) =>
      user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return filteredUsers;
  }
}

export default Users;
