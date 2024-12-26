import { UserType } from '@customTypes/user';

const users: UserType[] = [
  {
    name: 'Enmanuel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Enmanuel',
    verified: true,
  },
  {
    name: 'Luis',
    url: 'https://avatar.iran.liara.run/public/boy?username=Luis',
  },
  {
    name: 'Miguel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Miguel',
  },
];

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadUsers = async (state?: string) => {
  return {
    users: sleep().then(() =>
      users.filter((user) => (state === 'verified' ? user.verified : true))
    ),
  };
};
