import {
  UserByIndexLoaderData,
  UserCreate,
  UserLoaderData,
} from '@customTypes/user';

abstract class DataDS {
  abstract loadUsers(state?: string): Promise<UserLoaderData>;

  abstract loadUserByIndex(index: number): Promise<UserByIndexLoaderData>;

  abstract saveUser(user: UserCreate): Promise<void>;

  abstract deleteUser(index: number): Promise<void>;
}

export default DataDS;
