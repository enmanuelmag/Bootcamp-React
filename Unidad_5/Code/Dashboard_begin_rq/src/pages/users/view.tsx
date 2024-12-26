import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DataRepo from '@api/datasource';

import { UserByIndexLoaderDataType } from '@customTypes/user';

import { QKeys } from '@constants/query';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';

const UserView = () => {
  const { index } = useParams<{ index: string }>();
  //const data = useLoaderData() as UserByIndexLoaderDataType;

  const userQuery = useQuery<
    UserByIndexLoaderDataType,
    Error,
    UserByIndexLoaderDataType,
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
    <React.Fragment>
      {isLoading && (
        <p className="cd-text-2xl cd-font-bold cd-text-center">
          Cargando usuario
        </p>
      )}
      {!isLoading && data && <UserProfile {...data.user} />}
    </React.Fragment>
  );
};

export default UserView;
