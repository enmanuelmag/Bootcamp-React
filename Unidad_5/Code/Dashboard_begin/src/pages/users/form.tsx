import React from 'react';
import moment from 'moment';
import DataRepo from '@api/datasource';
import { useNavigate, useParams } from 'react-router-dom';

import { UserCreateType } from '@customTypes/user';

import Input from '@components/form/Input';
import SwitchInput from '@components/form/Check';
import Verified from '@components/form/Verified';
import DateInput from '@components/form/Date';
import SelectInput from '@components/form/Select';

type Params = {
  index: string;
};

const INITIAL_STATE: UserCreateType = {
  name: '',
  birthday: moment().unix(),
  role: 'user',
  verified: false,
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const navigate = useNavigate();

  const [mode] = React.useState(index ? 'edit' : 'create');

  const [loading, setLoading] = React.useState(false);

  const [state, setState] = React.useState<UserCreateType>(INITIAL_STATE);

  return (
    <div>
      <div className="cd-flex cd-items-center cd-gap-4">
        <div
          className="cd-text-blue-500 cd-cursor-pointer"
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
        <h1 className="cd-text-4xl cd-font-bold">User form</h1>
      </div>

      <form
        className="cd-flex cd-flex-col cd-gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);

          DataRepo.saveUser(state)
            .then(() => {
              alert('User saved');
              navigate('/users');
            })
            .catch((error) => {
              alert('Error saving user');
              console.error(error);
            })
            .finally(() => setLoading(false));
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
          {loading ? 'Saving...' : mode === 'edit' ? 'Edit' : 'Create'}
        </button>
      </form>
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
