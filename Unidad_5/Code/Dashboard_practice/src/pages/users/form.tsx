import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { UserByIndexLoaderDataType, UserCreateType } from '@customTypes/user';

import DataRepo from '@api/datasource';

import { QKeys } from '@constants/query';

import { isLoadingMutation, isLoadingOrRefetchQuery } from '@utils/query';

import Input from '@components/form/Input';
import SwitchInput from '@components/form/Check';
import Verified from '@components/form/Verified';
import NumberInput from '@components/form/Number';

type Params = {
  index: string;
};

const INITIAL_STATE: UserCreateType = {
  name: '',
  age: 25,
  city: '',
  verified: false,
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [mode] = React.useState(index ? 'edit' : 'create');

  const [state, setState] = React.useState<UserCreateType>(INITIAL_STATE);

  const userQuery = useQuery<
    UserByIndexLoaderDataType,
    Error,
    UserByIndexLoaderDataType,
    [string, number]
  >({
    enabled: Boolean(index && Number(index) >= 0),
    queryKey: [QKeys.GET_USER, Number(index)],
    queryFn: async ({ queryKey }) => {
      return await DataRepo.loadUserByIndex(Number(queryKey[1]));
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
      return await DataRepo.updateUser(Number(index), user);
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

  React.useEffect(() => {
    if (mode === 'create' || !userQuery.data) {
      return;
    }

    setState(userQuery.data.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery.data?.user]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      console.log('Unmount');
      setState(INITIAL_STATE);
    };
  }, []);

  const VerifiedMemo = React.useMemo(
    () => <Verified verified={state.verified} />,
    [state.verified]
  );

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

            if (mode === 'edit' && index) {
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

          <NumberInput
            label="Age"
            value={state.age}
            onChange={handleChange.bind(null, 'age')}
          />

          <Input
            ref={inputRef}
            label="City"
            value={state.city}
            onChange={handleChange.bind(null, 'city')}
          />

          <SwitchInput
            label="Verified"
            value={Boolean(state.verified)}
            onChange={handleChange.bind(null, 'verified')}
          />

          {VerifiedMemo}

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
