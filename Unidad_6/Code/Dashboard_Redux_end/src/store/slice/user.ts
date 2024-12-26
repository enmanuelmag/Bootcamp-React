import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@store/index';

import { UserLogin } from '@customTypes/store';

const initialState: UserLogin = {
  role: 'admin',
  city: 'Manta',
  name: 'Enmanuel Magallanes',
  email: 'enmanuelmag@cardor.dev',
};

export const userLoginSlice = createSlice({
  name: 'user-login',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserLogin['role']>) => {
      state.role = action.payload;
    },
    setName: (state, action: PayloadAction<UserLogin['name']>) => {
      state.name = action.payload;
    },
    setCity: (state, action: PayloadAction<UserLogin['city']>) => {
      state.city = action.payload;
    },
  },
});

export const userLoginAction = userLoginSlice.actions;

export const selectUserRole = (state: RootState) => state.userLogin.role;

export const selectUserName = (state: RootState) => state.userLogin.name;

export const selectUserCity = (state: RootState) => state.userLogin.city;

export const selectUser = (state: RootState) => state.userLogin;

export default userLoginSlice.reducer;
