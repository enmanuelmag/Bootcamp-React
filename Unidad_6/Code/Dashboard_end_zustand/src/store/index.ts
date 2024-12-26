import { create } from 'zustand';

import { ThemeType, UserLoginType } from '@customTypes/store';

import { UserActionsType, initialUserState } from '@store/slices/user';
import { ThemeActionsType, initialSchemaState } from '@store/slices/schema';

type StoreType = UserLoginType & UserActionsType & ThemeType & ThemeActionsType;

const useAppStore = create<StoreType>((set) => ({
  ...initialUserState,
  ...initialSchemaState,
  //actions user
  setUser: (user) => set({ ...user }),
  setField: (field, value) => set({ [field]: value }),
  //actions theme
  clearTheme: () => set({ schema: 'light' }),
  clearUser: () => set({ ...initialUserState }),
  setSchema: (schema) => set({ schema }),
  toggleTheme: () =>
    set((state) => {
      const newSchema = state.schema === 'light' ? 'dark' : 'light';

      localStorage.setItem('schema', newSchema);

      if (newSchema === 'light') {
        document.body.classList.remove('cd-dark');
      } else {
        document.body.classList.add('cd-dark');
      }

      return {
        ...state,
        schema: newSchema,
      };
    }),
}));

export default useAppStore;
