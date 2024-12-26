import { ThemeType } from '@customTypes/store';

export type ThemeActionsType = {
  toggleTheme: () => void;
  clearTheme: () => void;
  setSchema: (schema: 'light' | 'dark') => void;
};

export const initialSchemaState: ThemeType = {
  schema: 'light',
};
