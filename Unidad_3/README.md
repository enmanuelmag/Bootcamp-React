# Modulo 3 - Routing en ReactJS

## ¿Qué es Routing?

Es la forma en la que el usuario puede desplazarse o visitar diferentes secciones de una aplicación web. Básicamente es una asociación de un URL, con algún componente de ReactJS. Estas URLs pueden ser:

- Estáticas
- Dinámicas

## ¿Por qué Routing usarlo?

- Mejora la experiencia del usuario.
- Facilita la navegación.
- Permite compartir enlaces.
- Facilita la indexación de motores de búsqueda.

## React Router

Es una librería de ReactJS que permite manejar el enrutamiento de una aplicación web. Es la más popular y utilizada en la actualidad.

## Instalación de React Router

```bash
npm install react-router-dom
```

## Configurando rutas

Definiremos un nuevo componente para que sea nuestra pantalla de inicio. Con un botón “Ver usuarios” que nos dirigirá a la ruta “/users”. En esto usaremos los features:
- Estructura de carpetas con buenas prácticas. Definir carpeta pages, componentes, api.
- Loader, para cargar la lista de usuarios desde una primer.
- Hook de estado de la ruta, para saber si esta o no cargando la data.

### Estructura de carpetas

> El código final para esta sección se encuentra en la carpeta `Code/Routing_practice` de este módulo.

```
src/
  components/
    Layout.tsx  <- Nuevo
    UserProfile.tsx
  pages/        <- Nuevo
    home/
      index.tsx
    users/
      index.tsx
  types/        <- Nuevo
    user.ts
  api/          <- Nuevo
    users.ts
  App.tsx
```

Pasos a seguir:
1. Crear la carpeta `pages` en `src/`.
2. Crear la carpeta `home` dentro de `pages` y dentro de ella el archivo `index.tsx`.
3. Agregar un botón en `index.tsx` sencillo con el texto `Ver usuarios` que nos redirija a la ruta `/users`.
4. Crear el archivo `Layout.tsx` dentro de `components`. En el renderizaremos el componente `Outlet` de `react-router-dom`.
5. Crear la carpeta `types` en `src/` y dentro de ella el archivo `user.ts`. El type de `user` debe contener:
     - name: string
     - url: string
     - verified: boolean?
6. Crear la carpeta `api` en `src/` y dentro de ella el archivo `users.ts`. En este archivo crearemos una función que nos devuelva una lista de usuarios.
     - Los usuarios deben estar en un Array (definir mínimo 3) 
     - Crear una función `sleep` que nos permita simular una carga de datos.
     - Crear la función `loadUsers` que nos devuelva una promesa con los usuarios. Usar `sleep` para simular la carga y `defer` para resolver la promesa.
     - Definir el tipo `UserLoaderData` de retorno de la función.
7. Crear la carpeta `users` dentro de `pages` y dentro de ella el archivo `index.tsx`. En este archivo:
      - Importar el tipo `UserLoaderData` de `api/users.ts`.
      - Importar el hook `useLoaderData` de `react-router-dom` y guardarlo en una constante `data`.
      - Importar el componente `Await` de `react-router-dom` para manejar la promesa.
      - Hacer uso de React.Suspense para mostrar un loader mientras se carga la data.
      - Dentro de `Await` renderizar la lista de usuarios con el componente `UserProfile`.
8. En `main.tsx`:
      - Usar `createBrowserRouter` de `react-router-dom` para crear el router.
      - Importar y envolver la aplicación con `RouterProvider`.

El contenido debería verse similar a esto:
```tsx
// Crear el BrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'users/:state?',
        loader: ({ params }) => {
          console.log('Params from users/:state?', params);
          return loadUsers(params.state);
        },
        element: <Users />,
        errorElement: <ErrorUser />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Añadir el RouterProvider con el router */}
    <RouterProvider router={router} />
  </StrictMode>
);
```

Ahora solo queda ejecutar el proyecto con `npm run dev` y probar la navegación y revisar si todo funciona correctamente, caso contrario revisar los errores en la consola.

## Práctica Routing (Tarea)

Consiste en realizar lo siguiente:

- Crear una nueva ruta de la forma “users/view/{id}”, donde {id} es un parámetro obligatorio en la ruta. Este se usará para encontrar el usuario con el index en el Array.
- En caso de que no exista tal usuario con ese index se deberá mostrar un texto sencillo indicado que el usuario no existe. Se debe agregar un componente `<a>` con el texto “Ver perfil” en cada card del usuario. El index del usuario debe ser un nuevo prop de tipo numérico y opcional, debido a que solo se enviara desde la vista de lista.
- Tomar en cuenta el uso del prop “Loader”, la sintaxis para definir parámetros en React-router y crear una nueva función “loadUserByIndex” para devolver el usuario.

> Hint: Crear otro archivo view.tsx dentro de la carpeta `users` que use el hook `userLoaderData` y que haga uso del componente `UserProfile` para enviar la data.
