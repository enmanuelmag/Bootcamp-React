import { configureStore, combineReducers } from '@reduxjs/toolkit';

import UserSlice from '@store/slice/user';

import ThemeSlice from '@store/slice/theme';

const rootReducer = combineReducers({
  userLogin: UserSlice,
  theme: ThemeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
