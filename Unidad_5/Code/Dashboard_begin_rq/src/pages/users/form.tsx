import React from 'react';
import moment from 'moment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { UserByIdLoaderDataType, UserCreateType } from '@customTypes/user';

import DataRepo from '@api/datasource';

import { QKeys } from '@constants/query';

import { isLoadingMutation, isLoadingOrRefetchQuery } from '@utils/query';

import Input from '@components/form/Input';
import DateInput from '@components/form/Date';
import Verified from '@components/form/Verified';
import SwitchInput from '@components/form/Check';
import SelectInput from '@components/form/Select';

type Params = {
  id: string;
};

const INITIAL_STATE: UserCreateType = {
  name: '',
  birthday: moment().unix(),
  role: 'user',
  verified: false,
};

const UserForm = () => {
  const { id } = useParams<Params>();

  const navigate = useNavigate();

  //const data = useLoaderData() as UserByIndexLoaderDataType;

  const [mode] = React.useState(id ? 'edit' : 'create');

  const [state, setState] = React.useState<UserCreateType>(INITIAL_STATE);

  const userQuery = useQuery<
    UserByIdLoaderDataType,
    Error,
    UserByIdLoaderDataType,
    [string, string | undefined]
  >({
    enabled: Boolean(id),
    queryKey: [QKeys.GET_USER, id],
    queryFn: async ({ queryKey }) => {
      return await DataRepo.loadUserById(queryKey[1]!);
    },
  });

  const userCreateMutation = useMutation<void, Error, UserCreateType>({
    mutationFn: async (user) => {
      return await DataRepo.saveUser(user);
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Error saving user');
        return;
      }

      alert('User saved');
      setState(INITIAL_STATE);
      navigate('/users');
    },
  });

  const userUpdateMutation = useMutation<void, Error, UserCreateType>({
    mutationFn: async (user) => {
      return await DataRepo.updateUser(id!, user);
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Error updating user');
        return;
      }

      alert('User updated');
      setState(INITIAL_STATE);
      navigate('/users');
    },
  });

  const isLoadingForm = isLoadingMutation(
    userCreateMutation,
    userUpdateMutation
  );

  const isLoadingQuery = isLoadingOrRefetchQuery(userQuery);

  return (
    <div>
      {!isLoadingQuery && (
        <div className="cd-flex cd-items-center cd-gap-4">
          <div
            className="cd-text-blue-500 cd-cursor-pointer cd-w-[25px] cd-h-[25px]"
            onClick={() => navigate('/users')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <h1 className="cd-text-4xl cd-font-bold">User form</h1>
        </div>
      )}

      {isLoadingQuery && (
        <p className="cd-text-2xl cd-font-bold cd-text-center">Loading form</p>
      )}

      {!isLoadingQuery && (
        <form
          className="cd-flex cd-flex-col cd-gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            if (mode === 'edit' && id) {
              userUpdateMutation.mutate(state);
            } else {
              userCreateMutation.mutate(state);
            }
          }}
        >
          <Input
            label="Name"
            value={state.name}
            onChange={handleChange.bind(null, 'name')}
          />

          <DateInput
            label="Birthday"
            value={state.birthday}
            onChange={handleChange.bind(null, 'birthday')}
          />

          <SelectInput
            label="Role"
            value={state.role}
            options={['admin', 'user']}
            onChange={handleChange.bind(null, 'role')}
          />

          <SwitchInput
            label="Verified"
            value={Boolean(state.verified)}
            onChange={handleChange.bind(null, 'verified')}
          />

          <Verified verified={state.verified} />

          <button
            className="cd-px-4 cd-py-2 cd-text-white cd-bg-blue-500 cd-rounded-md hover:cd-bg-blue-700"
            type="submit"
          >
            {isLoadingForm ? 'Saving...' : mode === 'edit' ? 'Edit' : 'Create'}
          </button>
        </form>
      )}
    </div>
  );

  function handleChange(
    key: keyof UserCreateType,
    value: string | number | boolean
  ) {
    setState({
      ...state,
      [key]: value,
    });
  }
};

export default UserForm;
