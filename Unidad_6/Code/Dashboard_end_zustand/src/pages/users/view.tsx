import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DataRepo from '@api/datasource';

import { UserByIdLoaderDataType } from '@customTypes/user';

import { QKeys } from '@constants/query';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';

const UserView = () => {
  const { id } = useParams<{ id: string }>();
  //const data = useLoaderData() as UserByIndexLoaderDataType;

  const userQuery = useQuery<
    UserByIdLoaderDataType,
    Error,
    UserByIdLoaderDataType,
    [string, string | undefined]
  >({
    enabled: Boolean(id),
    queryKey: [QKeys.GET_USER_BY_INDEX, id],
    queryFn: async ({ queryKey }) => {
      return await DataRepo.loadUserById(queryKey[1]!);
    },
  });

  const { data } = userQuery;

  const isLoading = isLoadingOrRefetchQuery(userQuery);

  return (
    <React.Fragment>
      {isLoading && (
        <p className="cd-text-2xl cd-font-bold cd-text-center">
          Cargando usuario
        </p>
      )}
      {!isLoading && data?.user && (
        <UserProfile key={`profile-${data.user.id}`} data={data.user} />
      )}
      {!isLoading && !data?.user && (
        <p className="cd-text-2xl cd-font-bold cd-text-center">
          No se encontró el usuario
        </p>
      )}
    </React.Fragment>
  );
};

export default UserView;
