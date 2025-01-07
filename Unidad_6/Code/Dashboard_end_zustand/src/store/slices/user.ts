import { UserLoginType } from '@customTypes/store';

export type UserActionsType = {
  clearUser: () => void;
  setUser: (user: UserLoginType) => void;
  setField: (
    key: keyof UserLoginType,
    value: string | 'admin' | 'user'
  ) => void;
};

export const initialUserState: UserLoginType = {
  name: '',
  role: 'admin',
};
