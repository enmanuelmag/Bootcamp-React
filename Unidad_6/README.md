# Unidad 6 - Global State

## ¿Qué es un estado global?

El global state es un concepto ampliamente aplicado en diversas aplicaciones, ya sea web, nativas, incluso en ciertos servidores. En ReactJS, el estado global nos permite almacenar cualquier tipo dato, ya sea primitivo, JSON, Clase etc. Además, en ReactJS se acostumbra a definir además de los valores, también las funciones que realizan las modificaciones, del estado.

## ¿Por qué usar un estado global?

Los componentes pueden compartir valores entre sí con la ayuda de props. Sin embargo, el problema está cuando deseamos compartir valores o funciones, entre componentes hermanos, o que el flujo va de un componente hijo a un padre. Incluso si fuera de un componente padre a un “nieto” eso involucra que se necesita enviar valores a un componente intermedio. Que probablemente no necesite esos valores, pero los recibe solo a manera de “Componente tránsito”, lo que provoca que el componente tenga mas código del que debería.

## ¿Qué opciones hay para crearlo?

- React Context.
- Zustand
- Redux (Sagas o Thunks)

## Definición de implementación

A continuación, usaremos el global State para mocker los datos de un usuario logeado que puede tener el rol de “admin” y “user”.
- Admin, puede entrar a todas las secciones y crear nuevos usuarios.
- User, no puede crear nuevos usuarios solo listar usuarios o alguno con su URL directo.

> Puntos extra: Definir un tema de la aplicación con store zustand, que puede ser “light” o “dark”.
> Este valor debe ser accesible desde cualquier componente de la aplicación.
> Y se debe cambiar desde un botón que estará en el layout.

## Implementación React Context

Estructura de carpetas:
```
src/
  ...
  types/
    ...
    context.ts
  context/
    index.ts
  ...
```

1. Crear el archivo `context.ts` en la carpeta `types`, este archivo definirá la estructura de los datos que se almacenarán en el estado global.
```typescript
import { z } from 'zod';
import { UserSchema } from './user';

export const UserLoginSchema = UserSchema.pick({
  name: true,
}).extend({
  role: z.enum(['admin', 'user']),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;
```
2. Crear el archivo `index.ts` en la carpeta `context`, este archivo definirá el contexto y el proveedor del estado global.
```typescript
import React from 'react';
import { UserLogin } from '@customTypes/context';

export const INITIAL_USER_LOGIN: UserLogin = {
  name: 'Enmanuel',
  role: 'user',
};

const MyContext = React.createContext<UserLogin>(INITIAL_USER_LOGIN);

export default MyContext;
```
3. Envolver a nuestra app con el proveedor del contexto en el archivo `main.tsx`.
4. En el componente Layout, crear la lógica para validar que el usuario tiene permiso para ingresar a los paths de la aplicación.
5. En el componente `home`, ocultar las secciones según el rol del usuario.

Pasos para toggle de tema:
1. Crear el nuevo type `Theme` en el archivo `context.ts`.
```typescript
export const ThemeSchema = z.object({
  schema: z.enum(['light', 'dark']),
  toggleSchema: z.function().returns(z.void()),
});

export type ThemeType = z.infer<typeof ThemeSchema>;
```
2. Actualizar el initial state del contexto en el archivo `index.ts`.
```typescript
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
}

export type MyContextType = UserLoginType & ThemeType;

const MyContext = React.createContext<MyContextType>(INITIAL_STATE);
```
3. Enviar el nuevo INITIAL_THEME en el proveedor del contexto.
```jsx
function App() {
  const [state, setState] = React.useState<MyContextType>(INITIAL_STATE);

  React.useEffect(() => {
    const schema = localStorage.getItem('schema') as 'light' | 'dark' | null;

    if (schema) {
      setSchema(schema);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        ...state,
        toggleSchema: () =>
          setSchema(state.schema === 'light' ? 'dark' : 'light'),
      }}
    >
      {/* Añadir el RouterProvider con el router */}
      <RouterProvider router={router} />
    </MyContext.Provider>
  );

  function setSchema(newSchema: 'light' | 'dark') {
    setState((prev) => ({
      ...prev,
      schema: newSchema,
    }));

    localStorage.setItem('schema', newSchema);

    if (newSchema === 'light') {
      document.body.classList.remove('cd-dark');
    } else {
      document.body.classList.add('cd-dark');
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```
5. En el componente Layout, crear el botón para cambiar el tema de la aplicación.
6. Actualizar ciertos estilos según el tema seleccionado.
7. Actualizar el config de tailwind.
```ts
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector', // <--- Añadir esta línea
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Usar prefijos en las clases puede ser útil para evitar conflictos con otras librerías o para encontrar más fácilmente las clases de Tailwind
  prefix: 'cd-',
  theme: {
    extend: {},
  },
  plugins: [],
};

```

## Implementación Zustand

Primero se debe instalar las dependencias necesarias:
```bash
npm install zustand
```

La implementación de Zustand es mucho las sencilla que Redux y Context, ya que solo se necesita crear el store (con sus acciones y reducers) y para acceder a los valores del store se puede usar el hook que devuelve la función `create` de Zustand, no es necesario envolver a la app con un proveedor de contexto.

Estructura de carpetas:
```
src/
  ...
  store/
    index.ts
  ...
```

1. Crear el archivo `index.ts` en la carpeta `store`, este archivo definirá el store de Zustand.
2. Crear la carpeta `slice` en la carpeta `store`. Y dentro crear el archivo `user.ts` y `theme.ts`.
3. Dentro de cada slice definiremos el `type` de campos y acciones de cada slice.

Slice de `user.ts`:
```typescript
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
  role: 'user',
};
```

Slice de `schema.ts`:
```typescript
import { ThemeType } from '@customTypes/store';

export type ThemeActionsType = {
  toggleTheme: () => void;
  clearTheme: () => void;
};

export const initialSchemaState: ThemeType = {
  schema: 'light',
};
```

4. Ahora solo queda crear el store de Zustand en el archivo `index.ts` de la carpeta `store` con el contenido de los slice y definir las funciones que modificarán el estado global.
```typescript
import { create } from 'zustand';

import { ThemeType, UserLoginType } from '@customTypes/store';

import { UserActionsType, initialUserState } from '@store/slices/user';
import { ThemeActionsType, initialSchemaState } from '@store/slices/schema';

type StoreType = UserLoginType & UserActionsType & ThemeType & ThemeActionsType;

const useStore = create<StoreType>((set) => ({
  ...initialUserState,
  ...initialSchemaState,
  //actions user
  setUser: (user) => set((state) => ({ ...state, ...user })),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  //actions theme
  clearTheme: () => set((state) => ({ ...state, schema: 'light' })),
  clearUser: () => set((state) => ({ ...state, ...initialUserState })),
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

export default useStore;
```
5. Actualizar el `main.tsx` debido a que ahora no necesitamos ningun provider.
6. Actualizar la app para usar el hook personalizado `useStore` . Recordemos que podemos acceder a los valores y funciones del store de manera directa.
7. Añadir el useEffect para cargar el tema guardado en el localStorage desde el componente Layout.


## Implementación Redux

Primero se debe instalar las dependencias necesarias:
```bash
npm install @reduxjs/toolkit Redux react-redux
```

Estructura de carpetas:
```
src/
  ...
  types/
    ...
    store.ts
  store/
    index.ts
    slice/
      theme.ts
      user.ts 
  ...
```

1. Crear el archivo `store.ts` en la carpeta `types`, este archivo definirá la estructura de los datos que se almacenarán en el estado global.
```typescript
import z from 'zod';

export const UserLoginSchema = z.object({
  name: z.string(),
  city: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const ThemeSchema = z.object({
  schema: z.enum(['light', 'dark']),
});

export type Theme = z.infer<typeof ThemeSchema>;
```
2. Crear el slide para `theme.ts` en la carpeta `slice`, este archivo definirá las acciones y reducers para el tema de la aplicación.
```typescript
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
```
3. Crear el slide para `user.ts` en la carpeta `slice`, este archivo definirá las acciones y reducers para el usuario logeado.
```typescript
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
```
4. Crear el archivo `index.ts` en la carpeta `store`, este archivo definirá el store de Redux.
```typescript
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
```

5. Envolver a nuestra app con el proveedor del store en el archivo `main.tsx`.
6. Para facilitar el acceso a la funciones que modifican el estado global, se puede crear un hook personalizado. En el archivo `hooks/store.ts`.
```typescript
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@store/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
```
7. Actualizar la app para usar el hook personalizado en lugar de `useDispatch` (devuelve la función dispatch para actualizar) y `useSelector` (devuelve el valor según el selector que se le pase).
8. En el componente Layout, crear la lógica para validar que el usuario tiene permiso para ingresar a los paths de la aplicación.
