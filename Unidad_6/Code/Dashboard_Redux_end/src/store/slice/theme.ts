import type { RootState } from '@store/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme } from '@customTypes/store';

const initialState: Theme = {
  schema: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme['schema']>) => {
      state.schema = action.payload;
    },
    toggleTheme: (state) => {
      state.schema = state.schema === 'light' ? 'dark' : 'light';
    },
  },
});

export const themeAction = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.schema;

export default themeSlice.reducer;
