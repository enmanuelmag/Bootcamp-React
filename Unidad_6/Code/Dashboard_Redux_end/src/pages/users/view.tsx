import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { UserByIndexLoaderData } from '@customTypes/user';

import DataRepo from '@api/datasource';

import { QKeys } from '@constants/query';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';

const UserView = () => {
  const { index } = useParams<{ index: string }>();

  const userQuery = useQuery<
    UserByIndexLoaderData,
    Error,
    UserByIndexLoaderData,
    [string, number]
  >({
    enabled: Boolean(index),
    queryKey: [QKeys.GET_USER_BY_INDEX, Number(index)],
    queryFn: async ({ queryKey }) => {
      return await DataRepo.loadUserByIndex(queryKey[1]);
    },
  });

  const { data } = userQuery;

  const isLoading = isLoadingOrRefetchQuery(userQuery);

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuario</p>
      }
    >
      {isLoading && (
        <p className="text-2xl font-bold text-center">Cargando usuario</p>
      )}
      {!isLoading && data && <UserProfile {...data.user} />}
    </React.Suspense>
  );
};

export default UserView;
