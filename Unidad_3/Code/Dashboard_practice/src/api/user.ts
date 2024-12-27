import moment from 'moment';

import { UserType } from '@customTypes/user';

const users: UserType[] = [
  {
    id: '123', //uuid(),
    name: 'Enmanuel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Enmanuel',
    verified: true,
    birthday: moment('1999-01-01').unix(),
    role: 'admin',
  },
  {
    id: '456', //uuid(),
    name: 'Luis',
    url: 'https://avatar.iran.liara.run/public/boy?username=Luis',
    birthday: moment('1994-06-27').unix(),
    role: 'user',
  },
  {
    id: '789', //uuid(),
    name: 'Miguel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Miguel',
    birthday: moment('2004-04-15').unix(),
    role: 'user',
  },
];

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadUsers = async (state?: string) => {
  return {
    users: sleep().then(() =>
      users.filter((user) => (state === 'verified' ? user.verified : true))
    ),
  };
};
