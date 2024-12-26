import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UserByIndexLoaderDataType,
  UserCreateSchema,
  UserCreateType,
} from '@customTypes/user';

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

  const [watchVerified, setWatchVerified] = React.useState(false);

  const formUser = useForm<UserCreateType>({
    defaultValues: INITIAL_STATE,
    resolver: zodResolver(UserCreateSchema),
  });

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
      formUser.reset(INITIAL_STATE);
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
      formUser.reset(INITIAL_STATE);
      navigate('/users');
    },
  });

  React.useEffect(() => {
    if (mode === 'create' || !userQuery.data) {
      return;
    }

    formUser.reset(userQuery.data.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery.data?.user]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      console.log('Unmount');
      formUser.reset(INITIAL_STATE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const subscription = formUser.watch((value, { name }) => {
      if (name === 'verified') {
        setWatchVerified(Boolean(value.verified));
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formUser.watch]);

  const VerifiedMemo = React.useMemo(
    () => <Verified verified={watchVerified} />,
    [watchVerified]
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
          onSubmit={formUser.handleSubmit((data) => {
            if (mode === 'create') {
              userCreateMutation.mutate(data);
            } else {
              userUpdateMutation.mutate(data);
            }
          })}
        >
          <Controller
            name="name"
            control={formUser.control}
            render={({ field }) => (
              <Input
                label="Name"
                value={field.value}
                onChange={field.onChange}
                error={formUser.formState.errors.name?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={formUser.control}
            render={({ field }) => (
              <NumberInput
                label="Age"
                value={field.value}
                onChange={field.onChange}
                error={formUser.formState.errors.age?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={formUser.control}
            render={({ field }) => (
              <Input
                label="City"
                value={field.value}
                onChange={field.onChange}
                error={formUser.formState.errors.city?.message}
              />
            )}
          />

          <Controller
            name="verified"
            control={formUser.control}
            render={({ field }) => (
              <SwitchInput
                label="Verified"
                value={Boolean(field.value)}
                onChange={field.onChange}
                error={formUser.formState.errors.verified?.message}
              />
            )}
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
};

export default UserForm;
