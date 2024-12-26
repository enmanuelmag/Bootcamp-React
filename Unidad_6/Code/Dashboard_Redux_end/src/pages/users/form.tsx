import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAppSelector } from '@hooks/store';

import { selectUser } from '@store/slice/user';

import {
  UserCreate,
  UserCreateSchema,
  UserByIndexLoaderData,
} from '@customTypes/user';

import DataRepo from '@api/datasource';

import { QKeys } from '@constants/query';

import { isLoadingMutation, isLoadingOrRefetchQuery } from '@utils/query';

import Input from '@components/Form/Input';
import Verified from '@components/Form/Verified';
import SwitchInput from '@components/Form/Check';
import NumberInput from '@components/Form/Number';

type Params = {
  index: string;
};

const INITIAL_STATE: UserCreate = {
  name: '',
  age: 25,
  city: '',
  verified: false,
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const { role, city: cityUserLogin } = useAppSelector(selectUser);

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [mode] = React.useState(index ? 'edit' : 'create');

  const formUser = useForm<UserCreate>({
    resolver: zodResolver(UserCreateSchema),
  });

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

  const userCreateMutation = useMutation<void, Error, UserCreate>({
    mutationFn: async (user) => {
      return await DataRepo.saveUser(user);
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Error saving user');
        return;
      }

      alert('User saved');
      formUser.reset(INITIAL_STATE);
    },
  });

  const isSaving = isLoadingMutation(userCreateMutation);

  const { city, verified } = formUser.watch();

  // Load user data after component is mounted
  React.useLayoutEffect(() => {
    if (mode === 'create' || !data?.user || isLoading) {
      if (role === 'saas-user') {
        formUser.reset({
          ...INITIAL_STATE,
          city: cityUserLogin,
        });
      }

      return;
    }

    const { name, age, city, verified } = data.user;

    console.log('User data', data.user);

    formUser.reset({
      name,
      age,
      verified,
      city: role === 'saas-user' ? cityUserLogin : city,
    });
  }, [data?.user, mode, isLoading, formUser, role, cityUserLogin]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      console.log('Unmounting');
      formUser.reset(INITIAL_STATE);
    };
    // eslint-disable-next-line
  }, []);

  const VerifiedMemo = React.useMemo(
    () => <Verified verified={verified} />,
    [verified]
  );

  return (
    <div className="flex flex-col gap-4 w-[40rem]">
      <div className="flex items-center gap-4">
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate(-1)}
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
        <h1 className="text-4xl font-bold">User form</h1>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={formUser.handleSubmit((data) => {
          if (role === 'user') return;

          userCreateMutation.mutate(data);
        })}
      >
        <Input
          label="Name"
          inputProps={formUser.register('name')}
          error={formUser.formState.errors.name?.message}
        />

        <NumberInput
          label="Age"
          inputProps={formUser.register('age')}
          error={formUser.formState.errors.age?.message}
        />

        <Input
          ref={inputRef}
          label="City"
          inputProps={{
            ...formUser.register('city'),
            disabled: role === 'saas-user',
            readOnly: role === 'saas-user',
            value: role === 'saas-user' ? cityUserLogin : city,
          }}
          error={formUser.formState.errors.city?.message}
        />

        <SwitchInput
          label="Verified"
          inputProps={formUser.register('verified')}
          error={formUser.formState.errors.verified?.message}
        />

        {VerifiedMemo}

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          type="submit"
          disabled={role === 'user'}
        >
          {isSaving ? 'Saving...' : mode === 'edit' ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
