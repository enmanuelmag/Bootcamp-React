import { ThemeType, UserLoginType } from '@customTypes/context';
import React from 'react';

const INITIAL_USER_LOGIN: UserLoginType = {
  name: 'Enmanuel',
  role: 'user',
};

const INITIAL_THEME: ThemeType = {
  schema: 'light',
  toggleSchema: () => {
    throw new Error('toggleSchema not implemented');
  },
};

export const INITIAL_STATE = {
  ...INITIAL_USER_LOGIN,
  ...INITIAL_THEME,
};

export type MyContextType = UserLoginType & ThemeType;

const MyContext = React.createContext<MyContextType>(INITIAL_STATE);

export default MyContext;
