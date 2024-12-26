# Módulo 4 - Hooks de ReactJS

## ¿Qué son los Hooks?

Con los componentes funciones no podemos mantener el estado de variables declarándolas con “let” ya que estas se reinicializan en cada render con el valor que escribimos en código. Es por esto que nacieron los Hooks, su traducción es gancho, y es porque permiten “enganchar” la funcionalidad del estado, y como lo veremos más adelante, administrar el Ciclo de vida del componente en Componentes funcionales y muchas más funcionalidades y características que podemos encapsular en Hooks.

## ¿Cómo se realizaba antes?

En los componentes Clase la administración del ciclo de vida y el manejo de estado se obtenía por herencia de la clase Component de ReactJS. Estas nos daban funciones tales como componentDidUpdate, componentWillUnmount, setState y demás que permitían la modificación del estado y administración del ciclo de vida del componente.

Componente Clase:

![Clases](image.png)

Componente Funcional:

![Funcional](image-1.png)

## Principales Hooks de ReactJS

A continuación, se presentan los principales Hooks de ReactJS, para mas info puedes visitar la [esta documentación de la comunidad](https://react-hooks-cheatsheet.com):

- useState, administración de estados, pueden ser primitivos, JSON, clases, etc.
- useEffect, admintración del life cycle del componente, lo veremos más adelante del curso. Dato, este siempre se ejecuta después de que el componente de haya renderizado por algún cambio.
- useContext, usado para obtener el estado global cuando usamos React Context como Global Store
- useLayoutEffect, se invoca muy similar que el useEffect, con la diferencia de que se invoca antes del render. Puede afectar al rendimiento según su implementación.
- useReducer, usado principalmente como alternativa del useState, para simplificar la invocación al querer actualizar el estado.
- useCallback, usado principalmente para evitar que funciones se redefinan en cada render. Limitando su re-definicion según una lista de dependencias. Así logramos que por ejemplo componentes que reciben estas funciones o valores se vuelvan a renderizar a pesar de que los valores que usan no hayan cambiado. Este se usa en funciones no en Componentes.
- useMemo, muy similar a useCallback, pero esta enfocado a memorizar VALORES, estos también pueden ser Componentes. Por lo que se puede usar para que un componente solo sea re-renderizado según la lista de dependencias que se declare.
- useRef, usado para almacenar valores en toda la vida de un componente, puede parecerse mucho a useState, pero este no retorna una función para actualizar el estado. Su uso principal es para guardar referencias de Componentes para así invicar funciones de ellos de manera programáticas.

# Usando Hooks

Para esta práctica crearemos un nuevo endpoint `users/form/:id?` que nos permita crear un nuevo usuario o editar uno existente. El formulario de esta página debe contener los siguientes campos:

- Name, un input de texto.
- Age, un input de número.
- City, un input de texto.
- Verified, un checkbox.

Se deben cumplir los siguientes requerimientos al usar los hooks:
- useState, para administrar el type “Form” que tendrá los datos del formulario.

Pasos:
1. Crear una función `$` en la carpeta `src/utils/styles.ts` que nos permita usar estilos de manera más sencilla.
2. Instalar zod, una librería de validación de datos y crear un schema para el type `Form`.
```bash 
npm install zod
```
1. Migrar todos los type que se hayan creado en las prácticas anteriores a la carpeta `src/types` y hacer uso de zod.
2. Crear los componentes de input necesarios en la carpeta `src/components/Form`.
      - Check
      - Input
      - Number
      - Verified
3. Crear la nueva vista/componente `form.tsx` en la carpeta `src/pages/users` que contenga el formulario y cumpla con los requerimientos. Dejar la lógica del guardado para el final.

Es importante todo este background de ReactJS porque esta librería al no ser un framework es muy fácil perderse en malas prácticas de código, estructura de proyecto y de más que después provocarán que sea muy difícil de mantener y adoptar para nuestros programadores. Se debe siempre estar al tanto de los patrones y buenas prácticas para aplicarlas de la mejor manera en todo proyecto.

A continuación, se describirá los pasos para implementar el patrón Datasource/Repository:

La estructura de carpetas de nuestro proyecto será la siguiente:
```
src/
  api/
    datasource/
      index.ts  <- Aquí es donde exportaremos la instancia de nuestro Repositorio para que sea usado en toda la aplicación.
    domain/
      ds/
        DataDS.ts <- Aqui definiremos la interfaz de nuestro Datasource (las funciones que debe implementar).
    impl
      ds/
        LocalStorageDS.ts <- Aquí implementaremos la lógica de nuestro Datasource usando LocalStorage.
      repo/
        DataRepoImpl.ts <- Aquí implementaremos la lógica de nuestro Repositorio que hará uso de nuestro Datasource.
  ...
  components/
    ...
    Form/
      Check.tsx
      Input.tsx
      Number.tsx
      Verified.tsx
  pages/
    users/
      ...
      form.tsx
  ...
  utils/
    styles.ts
```

Los pasos a seguir son los siguientes:
1. Crear la carpeta `domain` y `impl` dentro de `api`.
2. En la carpeta `domain` crear la carpeta `ds` y dentro de ella el archivo `DataDS.ts`. En este archivo definiremos la interfaz `DataDS` que contendrá las funciones que debe implementar nuestro Datasource, el contenido seria este:
      
```typescript
abstract class DataDS {
  abstract loadUsers(state?: string): Promise<UserLoaderData>;

  abstract loadUserByIndex(index: number): Promise<UserByIndexLoaderData>;

  abstract saveUser(user: UserCreate): Promise<void>;
}

export default DataDS;
```
3. En la carpeta `impl` crear la carpeta `ds` y dentro de ella el archivo `LocalStorageDS.ts`. En este archivo implementaremos la lógica de nuestro Datasource usando LocalStorage, el contenido seria este:
```typescript
const USERS_KEY = 'users';

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

class LocalStorageDS implements DataDS {
  async loadUsers(state?: string) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      return {
        users: users.filter((user) =>
          state === 'verified' ? user.verified : true
        ),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error loading users');
    }
  }
  async loadUserByIndex(index: number) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      return {
        user: users[index],
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error loading user');
    }
  }
  async saveUser(user: UserCreate) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      users.push({
        ...user,
        url: `https://avatar.iran.liara.run/public/${users.length + 1}`,
      });

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error(error);
      throw new Error('Error saving user');
    }
  }

  async updateUser(index: number, user: UserCreateType) {
    try {
      await sleep();

      const users = this.getUsers();

      const newUsers: UserType[] = users;

      const userToUpdate = newUsers[index];

      newUsers[index] = {
        ...userToUpdate,
        ...user,
      };

      localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el usuario');
    }
  }
}

export default LocalStorageDS;
```
4. En la carpeta `impl` crear la carpeta `repo` y dentro de ella el archivo `DataRepoImpl.ts`. En este archivo implementaremos la lógica de nuestro Repositorio que hará uso de nuestro Datasource, el contenido seria este:
```typescript
class DataRepoImpl {
  constructor(private data: DataDS) {}

  async loadUsers(state?: string): Promise<UserLoaderData> {
    return await this.data.loadUsers(state);
  }

  async loadUserByIndex(index: number): Promise<UserByIndexLoaderData> {
    return await this.data.loadUserByIndex(index);
  }

  async saveUser(user: UserCreate): Promise<void> {
    return await this.data.saveUser(user);
  }

  async updateUser(index: number, user: UserCreateType): Promise<void> {
    return this.data.updateUser(index, user);
  }
}

export default DataRepoImpl;
```

> Implementar el código de datasource/index.ts con la creación de las instancias

Como se puede observar, la clase abstracta `DataDS` nos sirve para definir las funciones que debe implementar nuestro Datasource, en este caso `LocalStorageDS`. La clase `LocalStorageDS` implementa la lógica de nuestro Datasource usando LocalStorage. La clase `DataRepoImpl` implementa la lógica de nuestro Repositorio que hará uso de nuestro Datasource el cual se le pasa en el constructor.

Este diseño nos permite tener una separación de responsabilidades y una fácil escalabilidad de nuestro proyecto. Además, nos permite cambiar fácilmente la implementación de nuestro Datasource sin afectar al resto de la aplicación, por si un dia usamos por ejemplo una API REST o Firebase en lugar de LocalStorage.

## Extra (Tarea)

Crear un botón en el componente “UserProfile” que se llame “Eliminar” de color rojo. Este deberá invocar una nueva función en nuestro DataSource “deleteUser” que recibe el index del usuario y lo elimina de la base de datos.


## Extra (React Query)
Existen muchas libs que nos pueden ayudar a resolver tareas, ahora revisaremos una que se llama react-query. Otras muy útiles para otras tareas son:
- Mantine, para componentes UI y tambien dispone de muchos hooks
- React-hook-form, para formularios.
- moment.js, para manejo de fechas.
- Axios, para peticiones HTTP.
- React-leaflet, para mapas.

Pasos para implementar React Query:
1. Instalar la librería `@tanstack/react-query` que nos permitirá hacer consultas a nuestro DataSource de manera más sencilla.
```bash
npm install @tanstack/react-query
```
1. Usar el Provider QueryClientProvider en nuestro archivo `src/main.tsx` para envolver toda la aplicación.
2. Crear las constantes para los keys de cada query en el archivo `src/constants/query.ts`.
3. Crear funciones utils para detectar cuando este cargando una query y cuando haya un error en el archivo `src/utils/query.ts`.
4. Hacer uso de la función useQuery/useMutation en nuestro componente `UserProfile` para obtener los datos del usuario.
